import { useMemo, useState } from 'react';
import { AssistantFace } from '@/components/AssistantFace';
import { MicButton } from '@/components/MicButton';
import { SettingsDrawer } from '@/components/SettingsDrawer';
import { audioService } from '@/services/audioService';
import { elevenLabsService } from '@/services/elevenLabsService';
import { useAppStore } from '@/store/useAppStore';
import { normalizeFaceId } from '@/utils/faces';

export function HomeScreen() {
  const { profiles, activeProfileId, assistant, setAssistantStatus, setDrawerOpen, addToast } = useAppStore();
  const [busy, setBusy] = useState(false);

  const activeProfile = useMemo(
    () => profiles.find((profile) => profile.id === activeProfileId) ?? profiles[0],
    [profiles, activeProfileId]
  );
  const activeFaceId = normalizeFaceId(activeProfile?.faceId ?? 'rotom');

  const runAssistantCycle = async () => {
    if (!activeProfile) {
      addToast('Create a profile before recording.', 'error');
      return;
    }

    if (assistant.status === 'listening') {
      setBusy(true);
      try {
        setAssistantStatus('thinking');
        const recordedAudio = await audioService.stopRecording();
        const transcript = await elevenLabsService.transcribeAudio(recordedAudio, activeProfile.config);
        const response = await elevenLabsService.sendToAgent(transcript.text, activeProfile.config);
        setAssistantStatus('speaking');
        await elevenLabsService.generateSpeech(response.replyText, activeProfile.config);
        setAssistantStatus('idle');
      } catch (error) {
        console.error(error);
        setAssistantStatus('error');
        addToast('Assistant flow failed. Check profile configuration.', 'error');
      } finally {
        setBusy(false);
      }
      return;
    }

    try {
      await audioService.startRecording();
      setAssistantStatus('listening');
    } catch (error) {
      console.error(error);
      addToast('Unable to access microphone permissions.', 'error');
      setAssistantStatus('error');
    }
  };

  return (
    <main className="relative min-h-screen bg-rotom-bg p-4 text-slate-100">
      <button className="rounded p-2 text-2xl" onClick={() => setDrawerOpen(true)} type="button">
        ☰
      </button>
      <SettingsDrawer />

      <section className="mt-2 flex flex-col items-center gap-6">
        <AssistantFace faceId={activeFaceId} state={assistant.status} />
        <MicButton disabled={busy} isActive={assistant.status === 'listening'} onClick={() => void runAssistantCycle()} />
      </section>
    </main>
  );
}
