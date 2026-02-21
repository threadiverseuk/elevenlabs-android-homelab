class AudioService {
  private mediaRecorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private stream: MediaStream | null = null;

  getMimeType(): string {
    const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
    return candidates.find((type) => MediaRecorder.isTypeSupported(type)) ?? '';
  }

  async startRecording(): Promise<void> {
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    this.chunks = [];
    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType: this.getMimeType() || undefined,
    });
    this.mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) this.chunks.push(event.data);
    };
    this.mediaRecorder.start();
  }

  async stopRecording(): Promise<Blob> {
    if (!this.mediaRecorder) throw new Error('Recorder is not active.');

    return new Promise<Blob>((resolve, reject) => {
      const recorder = this.mediaRecorder;
      recorder.onstop = () => {
        const blob = new Blob(this.chunks, { type: recorder.mimeType || 'audio/webm' });
        this.stream?.getTracks().forEach((track) => track.stop());
        this.mediaRecorder = null;
        this.stream = null;
        resolve(blob);
      };
      recorder.onerror = () => reject(new Error('Recording failed.'));
      recorder.stop();
    });
  }

  async playBlob(audioBlob: Blob): Promise<void> {
    const context = new AudioContext();
    const buffer = await audioBlob.arrayBuffer();
    const decoded = await context.decodeAudioData(buffer);
    const source = context.createBufferSource();
    source.buffer = decoded;
    source.connect(context.destination);
    source.start();

    await new Promise<void>((resolve) => {
      source.onended = () => {
        context.close().catch(() => undefined);
        resolve();
      };
    });
  }
}

export const audioService = new AudioService();
