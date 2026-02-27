// OceanVeil service integration (skeleton).
// This wires the service into the CLI and provides placeholder
// implementations for search and latest-episodes style functionality.
// Real API integration should be implemented by adding the appropriate
// HTTP calls inside this file.

// Package Info
import packageJson from './package.json';

// Modules
import { console } from './modules/log';
import * as yamlCfg from './modules/module.cfg-loader';
import * as yargs from './modules/module.app-args';
import * as reqModule from './modules/module.fetch';
import RawOutputManager from './modules/module.raw-output';

// Types
import { ServiceClass } from './@types/serviceClassInterface';
import { SearchData, SearchResponse } from './@types/messageHandler';

export default class Oceanveil implements ServiceClass {
	public cfg: yamlCfg.ConfigObject;
	private req: reqModule.Req;

	constructor(private debug = false) {
		this.cfg = yamlCfg.loadCfg();
		this.req = new reqModule.Req();
	}

	public async cli() {
		console.info(`\n=== Multi Downloader NX ${packageJson.version} ===\n`);
		const argv = yargs.appArgv(this.cfg.cli);
		if (argv.debug) this.debug = true;

		// Load binaries (kept for consistency with other services)
		this.cfg.bin = await yamlCfg.loadBinCfg();

		// Basic wiring for search and "newest" style listing.
		if (argv.search && argv.search.length > 2) {
			// Handle raw output for search (same pattern as other services)
			if (RawOutputManager.shouldOutputRaw(argv)) {
				const searchResults = await this.doSearch({ ...argv, search: argv.search as string });
				await RawOutputManager.saveRawOutput({
					service: 'oceanveil',
					data: searchResults,
					outputPath: RawOutputManager.getOutputPath(argv),
					dataType: 'search',
					description: `Search results for "${argv.search}" (OceanVeil placeholder)`
				});
				return;
			}

			await this.doSearch({ ...argv, search: argv.search as string });
		} else if (argv.new) {
			await this.getNewlyAdded(argv.page);
		} else {
			console.info(
				'OceanVeil service is wired into the CLI, but no supported option was selected. Try --service oceanveil --search "<title>" or --new.'
			);
		}
	}

	/**
	 * Placeholder search implementation for OceanVeil.
	 *
	 * Once the OceanVeil HTTP API or scraping strategy is known,
	 * replace the body of this method with real logic that:
	 *   - Performs a network request via this.req.getData(...)
	 *   - Parses the response
	 *   - Logs human-readable search results
	 *   - Returns a SearchResponse with isOk: true and mapped items
	 */
	public async doSearch(data: SearchData): Promise<SearchResponse> {
		console.warn('[OceanVeil] Search is not implemented yet. This is a placeholder stub.');
		console.warn(`[OceanVeil] Requested search term: "${data.search}"`);

		if (this.debug) {
			console.debug('[OceanVeil] Placeholder search returning no results. Implement API logic in oceanveil.ts.');
		}

		return {
			isOk: false,
			reason: new Error('OceanVeil search API is not implemented yet. Implement it in oceanveil.ts.')
		};
	}

	/**
	 * Placeholder "newly added / latest episodes" implementation.
	 *
	 * When the real OceanVeil API is known, implement this method to:
	 *   - Call the appropriate endpoint with pagination (page)
	 *   - Log the latest shows/episodes
	 *   - Optionally return structured data if needed
	 */
	public async getNewlyAdded(page?: number): Promise<void> {
		console.warn('[OceanVeil] --new / latest episodes is not implemented yet. This is a placeholder stub.');
		if (typeof page !== 'undefined') {
			console.warn(`[OceanVeil] Requested page: ${page}`);
		}
	}
}