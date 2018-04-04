export interface ITabResponse {
  contents: string;
}

export interface ITabSaveResponse {
  tabId: TabId;
}

export type TabId = string;

export class API {
  constructor(public root = "") {}

  public async fetchTab(tabId: TabId): Promise<ITabResponse> {
    const res = await fetch(`${this.root}/api/tabs/${tabId}`);
    const json = await res.json();
    return json as ITabResponse;
  }

  public async saveTab(contents: string, tabId?: TabId): Promise<ITabSaveResponse> {
    const url = tabId ? `${this.root}/api/tabs/${tabId}` : `${this.root}/api/tabs`;
    const res = await fetch(url, {
      body: JSON.stringify({contents}),
      method: tabId ? "PATCH" : "PUT",
    });
    const json = await res.json();
    return json as ITabSaveResponse;
  }
}
