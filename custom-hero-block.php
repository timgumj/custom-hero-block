<?php

/**
 * Plugin Name:       Custom Hero Block
 * Description:       A customizable hero section block with title, description, button, and background media.
 * Version:           0.1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-hero-block
 *
 * @package           custom-hero-block
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using metadata from the `block.json` file.
 * This also registers all block assets for enqueuing in the editor and on the frontend.
 *
 * @return void
 */
function create_block_custom_hero_block_block_init()
{
	$block_json_path = __DIR__ . '/build/block.json';

	// Check if the block.json file exists.
	if (file_exists($block_json_path)) {
		register_block_type($block_json_path);
	} else {
		// Optional: Log an error or notify the admin if block.json is missing.
		error_log('Custom Hero Block: Missing block.json file in build directory.');
	}
}
add_action('init', 'create_block_custom_hero_block_block_init');
