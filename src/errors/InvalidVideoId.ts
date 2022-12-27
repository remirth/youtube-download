export class InvalidVideoIdError extends Error {
  constructor(invalidVideoId: string) {
    super(`${invalidVideoId} is not a valid video ID`);
    this.name = 'InvalidVideoId';
  }
}
