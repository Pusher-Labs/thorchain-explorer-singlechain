export class ConstantTableItem<T> {
  key: string;
  value: T;
  override?: string;

  constructor(key: string, value: T, override?: string) {
    this.key = key;
    this.value = value;

    if (override) {
      this.override = override;
    }

  }
}

