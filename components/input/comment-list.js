import classes from './comment-list.module.css';

export default function CommentList(props) {
	const { items } = props;

	if (!items) {
		return <p>Loading...</p>;
	}
	return (
		<ul className={classes.comments}>
			{items.map(item => (
				<li key={item._id}>
					<p>{item.text}</p>
					<div>
						By <address>{item.name}</address>
					</div>
				</li>
			))}
		</ul>
	);
}
