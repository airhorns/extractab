export interface ITabResponse {
  contents: string;
}

export interface ITabSaveResponse {
  TabHandle: TabHandle;
}

export type TabHandle = string;

export class API {
  constructor(public root = "") {}

  public async fetchTab(TabHandle: TabHandle): Promise<ITabResponse> {
    const res = await fetch(`${this.root}/api/tabs/${TabHandle}`);
    const json = await res.json();
    return json as ITabResponse;
  }

  public async saveTab(contents: string, TabHandle?: TabHandle): Promise<ITabSaveResponse> {
    const url = TabHandle ? `${this.root}/api/tabs/${TabHandle}` : `${this.root}/api/tabs`;
    const res = await fetch(url, {
      body: JSON.stringify({contents}),
      method: TabHandle ? "PATCH" : "POST",
    });
    const json = await res.json();
    return json as ITabSaveResponse;
  }
}
