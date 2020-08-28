export class ConstantTableItem<T> {
  key: string;
  value: T;
  override?: T;

  constructor(key: string, value: T, override?: T) {
    this.key = key;
    this.value = value;

    if (override) {
      this.override = override;
    }

  }
}

