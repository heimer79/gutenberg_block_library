/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

import { PanelBody, ToggleControl } from '@wordpress/components';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */

// Import metadata from the block.json file
import metadata from './block.json';
// Import the Curve component from the components folder
import { Curve } from './components/curve';

// Define the Edit function component, which receives props as an argument
export default function Edit ( props )
{
	// Log the props object to the console for debugging purposes
	console.log( props );

	// Destructure the className from useBlockProps() and store the rest in blockProps
	const { className, ...blockProps } = useBlockProps();

	// Log the className to the console for debugging
	console.log( className );

	return (
		<>
			{/* Create a section element with combined classes and spread blockProps */ }
			<section className={ `${ className } alignfull` } { ...blockProps }>
				{/* Conditionally render the Curve component if enableTopCurve is true */ }
				{ props.attributes.enableTopCurve && <Curve /> }
			</section>

			{/* Commented out paragraph for reference or future use */ }
			{/* <p {...useBlockProps()}>
                {__('Blocklicious – hello from the editor!', metadata.textdomain)}
            </p> */}

			{/* Add inspector controls to the block */ }
			<InspectorControls>
				{/* Create a panel for the "Top curve" settings */ }
				<PanelBody title={ __( "Top curve", metadata.textdomain ) }>
					{/* Create a flex container for the toggle control */ }
					<div style={ { display: "flex" } }>
						{/* Add a ToggleControl for enabling/disabling the top curve */ }
						<ToggleControl
							onChange={ ( isChecked ) =>
							{
								// Update the enableTopCurve attribute when the toggle is changed
								props.setAttributes(
									{ enableTopCurve: isChecked }
								)
							} }
							checked={ props.attributes.enableTopCurve }
						/>
						{/* Add a label for the toggle control */ }
						<span>
							{ __( "Enable top curve", metadata.textdomain ) }
						</span>
					</div>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
