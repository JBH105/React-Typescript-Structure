class Config {
  public API_EPBASE_URL: string | undefined;
  public NODE_ENV: string | undefined;
  public API_TMSBASE_URL: string | undefined;


  constructor() {
    this.API_EPBASE_URL = import.meta.env.VITE_EPBASE_ENDPOINT || 'http://localhost:6061';
    this.API_TMSBASE_URL = import.meta.env.VITE_TMSBASE_ENDPOINT || 'http://localhost:8000';
    this.NODE_ENV = import.meta.env.VITE_NODE_ENV || 'local';
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
