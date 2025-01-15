import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const {
		title,
		description,
		buttonText,
		buttonUrl,
		mediaUrl,
		mediaType,
		topDivider,
		topDividerColor,
		topDividerHeight,
		bottomDivider,
		bottomDividerColor,
		bottomDividerHeight,
		rating,
		ratingText,
		googleIconUrl,
	} = attributes;


	const topDividerStyle = topDivider
		? {
				backgroundColor: topDividerColor,
				height: `${topDividerHeight}px`,
		  }
		: {};

	const bottomDividerStyle = bottomDivider
		? {
				backgroundColor: bottomDividerColor,
				height: `${bottomDividerHeight}px`,
		  }
		: {};


	const defaultGoogleIcon = new URL('./google-logo.svg', import.meta.url).toString();

	return (
		<section
			{...useBlockProps.save({
				className: 'custom-hero-section',
			})}
		>
			{/* Upper Section */}
			<div className="custom-hero-upper">
				{/* Top Divider */}
				{topDivider && (
					<div
						className="custom-hero-top-divider"
						style={topDividerStyle}
					></div>
				)}

				{/* Upper Content */}
				<div className="custom-hero-upper-content">
					{/* Title */}
					{title && <RichText.Content tagName="h1" value={title} />}

					{/* Description */}
					{description && <RichText.Content tagName="p" value={description} />}

					{/* Button */}
					{buttonText && (
						<a href={buttonUrl || '#'} className="custom-hero-button">
							{buttonText}
						</a>
					)}

					{/* Rating Section */}
					<div className="custom-hero-rating">
						{/* Google Icon */}
						<img
							src={googleIconUrl || defaultGoogleIcon}
							alt="Google Icon"
							className="custom-hero-google-icon"
						/>

						{/* Rating Number */}
						{rating && <span className="custom-hero-rating-number">{rating}</span>}

						{/* Stars */}
						<span className="custom-hero-stars">⭐ ⭐ ⭐ ⭐ ⭐</span>
					</div>

					{/* Bottom Divider */}
					{bottomDivider && (
						<div
							className="custom-hero-bottom-divider"
							style={bottomDividerStyle}
						></div>
					)}
				</div>
			</div>

			{/* Lower Section */}
			<div className="custom-hero-lower">
				<div className="custom-hero-media-container">
					{/* Media Content */}
					{mediaType === 'video' && mediaUrl ? (
						<video
							src={mediaUrl}
							autoPlay
							loop
							muted
							className="custom-hero-video"
						/>
					) : mediaType === 'image' && mediaUrl ? (
						<img
							src={mediaUrl}
							alt="Custom Hero Media"
							className="custom-hero-image"
						/>
					) : null}
				</div>
			</div>
		</section>
	);
}
