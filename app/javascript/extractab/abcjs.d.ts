// Type definitions for abcjs
// tslint:disable:interface-name no-namespace no-internal-module
declare module "abcjs" {
  namespace abcjs {
    interface RenderConfiguration {
      visualTranspose?: number;
      print?: boolean;
      header_only?: boolean;
      stop_on_warning?: boolean;
      hint_measures?: boolean;
      scale?: number;
      staffwidth?: number;
      paddingtop?: number;
      paddingbottom?: number;
      paddingright?: number;
      paddingleft?: number;
      add_classes?: boolean;
      clickListener?: (element: HTMLElement, tuneNumber: number, classes: string) => undefined;
      responsive?: "resize" | undefined;
    }

    interface MidiConfiguration extends RenderConfiguration {
      qpm?: number;
      program?: number;
      midiTranspose?: number;
      generateDownload?: boolean;
      generateInline?: boolean;
      downloadClass?: string;
      downloadLabel?: string | ((tune: Tune, index: number) => string);
      preTextDownload?: string;
      postTextDownload?: string;
      preTextInline?: string;
      postTextInline?: string;
      midiListener?: (currentElement: HTMLElement, currentMidiEvent: MidiEvent) => any;
      animate?: {
        listener: ((lastNote: HTMLElement[], nextNote: HTMLElement[], contextString?: string) => any),
        target: HTMLElement,
        qpm: number,
      };
      context?: string | undefined;
      inlineControls?: MidiInlineControlConfiguration;
      drum?: string;
      drumBars?: number;
      drumIntro?: number;
    }

    interface MidiInlineControlConfiguration {
      selectionToggle?: boolean;
      loopToggle?: boolean;
      standard?: boolean;
      tempo?: boolean;
      startPlaying?: boolean;
      tooltipSelection?: string;
      tooltipLoop?: string;
      tooltipReset?: string;
      tooltipPlay?: string;
      tooltipProgress?: string;
      tooltipTempo?: string;
    }

    interface MidiEvent {
      [eventProperty: string]: string | number;
    }

    interface TuneHash {
      abc: string;
      startPos: number;
    }

    interface TuneBook {
      tunes: TuneHash[];
      header: string[];
      getTuneById(id: string): TuneHash;
      getTuneByTitle(title: string): TuneHash;
    }

    type TuneLine = string[] | string;

    interface Tune {
      metaText: { [metaItem: string]: string};
      tempo: { noteLength: number, bpm: number };
      lines: TuneLine[];
    }

    type RenderDestination = string | HTMLElement;
    function renderAbc(output: RenderDestination, tunebookString: string, params?: RenderConfiguration): Tune[];
    function renderMidi(output: RenderDestination, tunebookString: string, params?: MidiConfiguration): Tune[];
  }

  export = abcjs;
}
// tslint:enable:interface-name no-namespace no-internal-module
