import { useRouter } from 'next/router';
import useSwr from 'swr';
// import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { useEffect, useState } from 'react';

export default function FilteredEventsPage(props) {
	const router = useRouter();
	const [events, setEvents] = useState();

	const { data, error } = useSwr(process.env.NEXT_PUBLIC_DB_HOST);

	const filterData = router.query.slug;

	useEffect(() => {
		if (data) {
			const events = [];
			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			setEvents(events);
		}
	}, [data]);

	if (!events) {
		return <p className='center'>Loading ...</p>;
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2021 ||
		numMonth < 1 ||
		numMonth > 12 ||
		error
	) {
		return (
			<>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		);
	}

	const filteredEvents = events.filter(event => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear &&
			eventDate.getMonth() === numMonth - 1
		);
	});

	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<>
				<ErrorAlert>
					<p>No events found for the chosen filter!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</>
	);
}

// export async function getServerSideProps(context) {
// 	const { params } = context;

// 	const filterData = params.slug;

// 	const filteredYear = filterData[0];
// 	const filteredMonth = filterData[1];

// 	const numYear = +filteredYear;
// 	const numMonth = +filteredMonth;

// 	if (
// 		isNaN(numYear) ||
// 		isNaN(numMonth) ||
// 		numYear > 2021 ||
// 		numMonth < 1 ||
// 		numMonth > 12
// 	) {
// 		return {
// 			props: { hasError: true },
// 			// notFound: true,
// 			// redirect: {
// 			// 	destination: '/error'
// 			// }
// 		};
// 	}

// 	const filteredEvents = await getFilteredEvents({
// 		year: numYear,
// 		month: numMonth,
// 	});

// 	return {
// 		props: { events: filteredEvents, date: { year: numYear, month: numMonth } },
// 	};
// }
