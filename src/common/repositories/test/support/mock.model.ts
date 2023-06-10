export abstract class MockModel<T> {
  protected abstract entityStub: T;

  constructor(entityData: T) {
    this.constructorSpy(entityData);
  }

  constructorSpy(_entityData: T): void {}

  findOne(): T {
    return this.entityStub;
  }

  find(): T[] {
    return [this.entityStub];
  }

  async save(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndUpdate(): Promise<T> {
    return this.entityStub;
  }

  async findOneAndDelete(): Promise<T> {
    return this.entityStub;
  }
}
