import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	ColorPalette,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	ToggleControl,
	RangeControl,
} from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
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
		topSectionBgImage,
	} = attributes;

	return (
		<>
			{/* Inspector Controls */}
			<InspectorControls>
				{/* Background Media Settings */}
				<PanelBody title={__('Background Settings', 'custom-hero-block')} initialOpen={true}>
					<TextControl
						label={__('Media URL', 'custom-hero-block')}
						value={mediaUrl}
						onChange={(value) => setAttributes({ mediaUrl: value })}
					/>
					<ToggleControl
						label={__('Enable Video Background', 'custom-hero-block')}
						checked={mediaType === 'video'}
						onChange={(value) => setAttributes({ mediaType: value ? 'video' : 'image' })}
					/>
				</PanelBody>

				{/* Top Section Background Image */}
				<PanelBody title={__('Top Section Background Image', 'custom-hero-block')} initialOpen={false}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({ topSectionBgImage: media.url })
							}
							allowedTypes={['image']}
							render={({ open }) => (
								<div>
									<Button onClick={open} variant="primary">
										{__('Select Background Image', 'custom-hero-block')}
									</Button>
									{topSectionBgImage && (
										<div style={{ marginTop: '10px' }}>
											<img
												src={topSectionBgImage}
												alt={__('Top Section Background', 'custom-hero-block')}
												style={{ maxWidth: '100%', height: 'auto' }}
											/>
											<Button
												variant="secondary"
												isDestructive
												onClick={() => setAttributes({ topSectionBgImage: '' })}
											>
												{__('Remove Background', 'custom-hero-block')}
											</Button>
										</div>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>

				{/* Divider Settings */}
				<PanelBody title={__('Divider Settings', 'custom-hero-block')} initialOpen={false}>
					{/* Top Divider */}
					<ToggleControl
						label={__('Enable Top Divider', 'custom-hero-block')}
						checked={topDivider}
						onChange={(value) => setAttributes({ topDivider: value })}
					/>
					{topDivider && (
						<>
							<p>{__('Top Divider Color:', 'custom-hero-block')}</p>
							<ColorPalette
								value={topDividerColor}
								onChange={(color) => setAttributes({ topDividerColor: color })}
							/>
							<RangeControl
								label={__('Top Divider Height', 'custom-hero-block')}
								value={topDividerHeight}
								onChange={(value) => setAttributes({ topDividerHeight: value })}
								min={10}
								max={200}
							/>
						</>
					)}

					{/* Bottom Divider */}
					<ToggleControl
						label={__('Enable Bottom Divider', 'custom-hero-block')}
						checked={bottomDivider}
						onChange={(value) => setAttributes({ bottomDivider: value })}
					/>
					{bottomDivider && (
						<>
							<p>{__('Bottom Divider Color:', 'custom-hero-block')}</p>
							<ColorPalette
								value={bottomDividerColor}
								onChange={(color) => setAttributes({ bottomDividerColor: color })}
							/>
							<RangeControl
								label={__('Bottom Divider Height', 'custom-hero-block')}
								value={bottomDividerHeight}
								onChange={(value) => setAttributes({ bottomDividerHeight: value })}
								min={10}
								max={200}
							/>
						</>
					)}
				</PanelBody>

				{/* Google Icon Settings */}
				<PanelBody title={__('Google Icon Settings', 'custom-hero-block')} initialOpen={false}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(media) =>
								setAttributes({ googleIconUrl: media.url })
							}
							allowedTypes={['image']}
							render={({ open }) => (
								<div>
									<Button onClick={open} variant="primary">
										{__('Select Google Icon', 'custom-hero-block')}
									</Button>
									{googleIconUrl && (
										<div style={{ marginTop: '10px' }}>
											<img
												src={googleIconUrl}
												alt={__('Google Icon', 'custom-hero-block')}
												style={{ maxWidth: '100px', height: 'auto' }}
											/>
											<Button
												variant="secondary"
												isDestructive
												onClick={() => setAttributes({ googleIconUrl: '' })}
											>
												{__('Remove Icon', 'custom-hero-block')}
											</Button>
										</div>
									)}
								</div>
							)}
						/>
					</MediaUploadCheck>
				</PanelBody>

				{/* Button Settings */}
				<PanelBody title={__('Button Settings', 'custom-hero-block')} initialOpen={false}>
					<TextControl
						label={__('Button Text', 'custom-hero-block')}
						value={buttonText}
						onChange={(value) => setAttributes({ buttonText: value })}
					/>
					<TextControl
						label={__('Button URL', 'custom-hero-block')}
						value={buttonUrl}
						onChange={(value) => setAttributes({ buttonUrl: value })}
					/>
				</PanelBody>
			</InspectorControls>

			{/* Hero Block Structure */}
			<div
				{...useBlockProps({
					className: 'custom-hero-block',
				})}
			>
				{/* Upper Section */}
				<div
					className="custom-hero-upper"
					style={{
						backgroundImage: `url(${topSectionBgImage})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
					}}
				>
					{/* Top Divider */}
					{topDivider && (
						<div
							className="custom-hero-top-divider"
							style={{
								backgroundColor: topDividerColor,
								height: `${topDividerHeight}px`,
							}}
						></div>
					)}

					{/* Upper Content */}
					<div className="custom-hero-upper-content">
						<RichText
							tagName="h1"
							value={title}
							onChange={(value) => setAttributes({ title: value })}
							placeholder={__('Add Title...', 'custom-hero-block')}
						/>
						<RichText
							tagName="p"
							value={description}
							onChange={(value) => setAttributes({ description: value })}
							placeholder={__('Add Description...', 'custom-hero-block')}
						/>
						<a href={buttonUrl} className="custom-hero-button">
							{buttonText}
						</a>

						{/* Rating Section */}
						<div className="custom-hero-rating">
							{googleIconUrl && (
								<img
									src={googleIconUrl}
									alt={__('Google Icon', 'custom-hero-block')}
									className="custom-hero-google-icon"
								/>
							)}
							<span className="custom-hero-rating-number">{rating}</span>
							<span className="custom-hero-stars">⭐ ⭐ ⭐ ⭐ ⭐</span>
							{/* <span className="custom-hero-rating-text">{ratingText}</span> */}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
