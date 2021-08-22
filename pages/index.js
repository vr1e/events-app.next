import Head from 'next/head';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage(props) {
	if (!props.events) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<Head>
				<title>NextJS Events</title>
				<meta
					name='description'
					content='Find a lot of great events that allow you to improve...'
				/>
			</Head>
			<NewsletterRegistration />
			<EventList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: { events: featuredEvents },
		revalidate: 60 * 60,
	};
}
