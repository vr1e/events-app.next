import Head from 'next/head';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
// import ErrorAlert from '../../components/ui/error-alert';
import { getEventById, getFeaturedEvents } from '../../helpers/api-util';

export default function EventDetailPage(props) {
	const { event } = props;

	if (!event) {
		return (
			<div className='center'>
				<p>Loading...</p>
			</div>
		);
	}

	return (
		<>
			<Head>
				<title>{event.title}</title>
				<meta
					name='description'
					content={event.description}
				/>
			</Head>
			<EventSummary title={event.title} />
			<EventLogistics
				date={event.date}
				address={event.location}
				image={event.image}
				imageAlt={event.title}
			/>
			<EventContent>
				<p>{event.description}</p>
			</EventContent>
		</>
	);
}

export const getStaticPaths = async () => {
	const events = await getFeaturedEvents();
	const pathsWithParams = events.map(event => ({
		params: { eventId: event.id },
	}));

	return {
		paths: pathsWithParams,
		fallback: 'blocking',
	};
};

export async function getStaticProps(context) {
	const { params } = context;
	const eventId = params.eventId;
	const event = await getEventById(eventId);

	if (!event) {
		return { notFound: true };
	}

	return {
		props: { event: event },
		revalidate: 60,
	};
}
