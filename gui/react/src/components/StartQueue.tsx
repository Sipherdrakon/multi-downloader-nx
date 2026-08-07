import { PauseCircleFilled, PlayCircleFilled } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import type { RandomEvent } from '../../../../@types/randomEvents';
import { messageChannelContext } from '../provider/MessageChannel';
import Require from './Require';

const StartQueueButton: React.FC = () => {
	const msg = React.useContext(messageChannelContext);
	const [start, setStart] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();

	// Initial sync only when the channel first becomes available. Ignore late
	// responses so an in-flight getDownloadQueue cannot overwrite a toggle.
	React.useEffect(() => {
		if (!msg) return;
		let cancelled = false;
		(async () => {
			const running = await msg.getDownloadQueue();
			if (!cancelled) setStart(running);
		})();
		return () => {
			cancelled = true;
		};
	}, [msg]);

	React.useEffect(() => {
		if (!msg) return;
		const listener = (ev: RandomEvent<'downloadQueueState'>) => {
			setStart(ev.data.running);
			if (ev.data.reason) {
				enqueueSnackbar(ev.data.reason, { variant: 'warning', persist: true });
			}
		};
		msg.randomEvents.on('downloadQueueState', listener);
		return () => {
			msg.randomEvents.removeListener('downloadQueueState', listener);
		};
	}, [msg, enqueueSnackbar]);

	const change = async () => {
		if (await msg?.isDownloading()) alert('The current download will be finished before the queue stops');
		msg?.setDownloadQueue(!start);
		setStart(!start);
	};

	return (
		<Require value={msg}>
			<Button startIcon={start ? <PauseCircleFilled /> : <PlayCircleFilled />} variant="contained" onClick={change} sx={{ maxHeight: '2.3rem' }}>
				{start ? 'Stop Queue' : 'Start Queue'}
			</Button>
		</Require>
	);
};

export default StartQueueButton;
