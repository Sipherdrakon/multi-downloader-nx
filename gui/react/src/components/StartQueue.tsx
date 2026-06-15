import { PauseCircleFilled, PlayCircleFilled } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import React from 'react';
import type { RandomEvent } from '../../../../@types/randomEvents';
import { messageChannelContext } from '../provider/MessageChannel';
import Require from './Require';

const StartQueueButton: React.FC = () => {
	const messageChannel = React.useContext(messageChannelContext);
	const [start, setStart] = React.useState(false);
	const msg = React.useContext(messageChannelContext);
	const { enqueueSnackbar } = useSnackbar();

	React.useEffect(() => {
		(async () => {
			if (!msg) return alert('Invalid state: msg not found');
			setStart(await msg.getDownloadQueue());
		})();
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
		if (await messageChannel?.isDownloading()) alert('The current download will be finished before the queue stops');
		msg?.setDownloadQueue(!start);
		setStart(!start);
	};

	return (
		<Require value={messageChannel}>
			<Button startIcon={start ? <PauseCircleFilled /> : <PlayCircleFilled />} variant="contained" onClick={change} sx={{ maxHeight: '2.3rem' }}>
				{start ? 'Stop Queue' : 'Start Queue'}
			</Button>
		</Require>
	);
};

export default StartQueueButton;
