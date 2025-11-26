import * as path from 'path';
import * as fs from 'fs';
import { ArgvType } from './module.app-args';
import { workingDir, loadCfg } from './module.cfg-loader';

// Use configured archive path if set, otherwise use default
// Resolve dynamically to support config changes
// This allows config changes to take effect without module reload
const getArchiveFilePath = (): string => {
	const cfg = loadCfg();
	if (cfg.dir.archive) {
		// If path is relative, resolve it relative to workingDir
		return path.isAbsolute(cfg.dir.archive) ? cfg.dir.archive : path.join(workingDir, cfg.dir.archive);
	}
	// Default location
	return path.join(workingDir, 'config', 'archive.json');
};

export type ItemType = {
	id: string;
	already: string[];
}[];

export type DataType = {
	hidive: {
		s: ItemType;
	};
	adn: {
		s: ItemType;
	};
	crunchy: {
		srz: ItemType;
		s: ItemType;
	};
};

const addToArchive = (
	kind:
		| {
				service: 'crunchy';
				type: 's' | 'srz';
		  }
		| {
				service: 'hidive';
				type: 's';
		  }
		| {
				service: 'adn';
				type: 's';
		  },
	ID: string
) => {
	const data = loadData();

	if (Object.prototype.hasOwnProperty.call(data, kind.service)) {
		const items = kind.service === 'crunchy' ? data[kind.service][kind.type] : data[kind.service][kind.type];
		if (items.findIndex((a) => a.id === ID) >= 0)
			// Prevent duplicate
			return;
		items.push({
			id: ID,
			already: []
		});
		(data as any)[kind.service][kind.type] = items;
	} else {
		if (kind.service === 'crunchy') {
			data['crunchy'] = {
				s: ([] as ItemType).concat(
					kind.type === 's'
						? {
								id: ID,
								already: [] as string[]
							}
						: []
				),
				srz: ([] as ItemType).concat(
					kind.type === 'srz'
						? {
								id: ID,
								already: [] as string[]
							}
						: []
				)
			};
		} else if (kind.service === 'adn') {
			data['adn'] = {
				s: [
					{
						id: ID,
						already: []
					}
				]
			};
		} else {
			data['hidive'] = {
				s: [
					{
						id: ID,
						already: []
					}
				]
			};
		}
	}
	const archivePath = getArchiveFilePath();
	const archiveDir = path.dirname(archivePath);
	if (!fs.existsSync(archiveDir)) {
		fs.mkdirSync(archiveDir, { recursive: true });
	}
	fs.writeFileSync(archivePath, JSON.stringify(data, null, 4));
};

const downloaded = (
	kind:
		| {
				service: 'crunchy';
				type: 's' | 'srz';
		  }
		| {
				service: 'hidive';
				type: 's';
		  }
		| {
				service: 'adn';
				type: 's';
		  },
	ID: string,
	episode: string[]
) => {
	let data = loadData();
	if (
		!Object.prototype.hasOwnProperty.call(data, kind.service) ||
		!Object.prototype.hasOwnProperty.call(data[kind.service], kind.type) ||
		!Object.prototype.hasOwnProperty.call((data as any)[kind.service][kind.type], ID)
	) {
		addToArchive(kind, ID);
		data = loadData(); // Load updated version
	}

	const archivedata = kind.service == 'crunchy' ? data[kind.service][kind.type] : data[kind.service][kind.type];
	const alreadyData = archivedata.find((a) => a.id === ID)?.already;
	for (const ep of episode) {
		if (alreadyData?.includes(ep)) continue;
		alreadyData?.push(ep);
	}
	const archivePath = getArchiveFilePath();
	const archiveDir = path.dirname(archivePath);
	if (!fs.existsSync(archiveDir)) {
		fs.mkdirSync(archiveDir, { recursive: true });
	}
	fs.writeFileSync(archivePath, JSON.stringify(data, null, 4));
};

const makeCommand = (service: 'crunchy' | 'hidive' | 'adn'): Partial<ArgvType>[] => {
	const data = loadData();
	const ret: Partial<ArgvType>[] = [];
	const kind = data[service];
	for (const type of Object.keys(kind)) {
		const item = kind[type as 's']; // 'srz' is also possible but will be ignored for the compiler
		item.forEach((i) =>
			ret.push({
				but: true,
				all: false,
				service,
				e: i.already.join(','),
				...(type === 's'
					? {
							s: i.id,
							series: undefined
						}
					: {
							series: i.id,
							s: undefined
						})
			})
		);
	}
	return ret;
};

const loadData = (): DataType => {
	const archivePath = getArchiveFilePath();
	if (fs.existsSync(archivePath)) return JSON.parse(fs.readFileSync(archivePath).toString()) as DataType;
	return {} as DataType;
};

export { addToArchive, downloaded, makeCommand };
