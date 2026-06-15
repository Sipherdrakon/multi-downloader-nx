import { ExtendedProgress, QueueItem } from './messageHandler';

export type RandomEvents = {
	progress: ExtendedProgress;
	finish: undefined;
	queueChange: QueueItem[];
	current: QueueItem | undefined;
	downloadQueueState: { running: boolean; reason?: string };
};

export interface RandomEvent<T extends keyof RandomEvents> {
	name: T;
	data: RandomEvents[T];
}

export type Handler<T extends keyof RandomEvents> = (data: RandomEvent<T>) => unknown;
