<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { json } from '@codemirror/lang-json';
	import { StreamLanguage } from '@codemirror/language';
	import { toml } from '@codemirror/legacy-modes/mode/toml';
	import * as TOML from '@ltd/j-toml';

	import { sampleTOML } from '../lib/sample';

	const editorStyles = {
		'&': {
			width: '100%',
			height: '100%'
		},
		'.cm-content': {
			'font-family': `ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', 'Ubuntu Mono', 'Roboto Mono', Menlo,
			Monaco, Consolas, monospace`
		}
	};

	let tomlValue = sampleTOML;
	let tomlError = null;
	let jsonValue = '';
	let jsonError = null;

	const handleTomlChange = ({ detail }) => {
		try {
			const toml = TOML.parse(detail, { bigint: false });
			jsonValue = JSON.stringify(toml, null, '  ');
			tomlError = null;
		} catch (err) {
			tomlError = err;
			console.error('TOML→JSON error', err);
		}
	};

	const handleJsonChange = ({ detail }) => {
		try {
			const json = JSON.parse(detail);
			if (Object.keys(json) == 0) {
				throw new Error(
					'Plain JSON objects cannot be represented in TOML (a root level object with keys is required)'
				);
			}
			tomlValue = TOML.stringify(json, { newline: '\n', xNull: true }).trimStart();
			jsonError = null;
		} catch (err) {
			jsonError = err;
			console.error('JSON→TOML error', err);
		}
	};

	handleTomlChange({ detail: tomlValue });
</script>

<section class="container">
	<header class="item">
		<h1>Online TOML to JSON converter</h1>
		<p>
			Convert TOML to JSON or JSON to TOML right here on this page (<code>toml2json</code> or
			<code>json2toml</code>).
		</p>
	</header>

	<div class="item">
		<h2>
			TOML {#if tomlError !== null}<span title={tomlError.message}>❌</span>{/if}
		</h2>
		<CodeMirror
			bind:value={tomlValue}
			on:change={handleTomlChange}
			lang={json()}
			extensions={[StreamLanguage.define(toml)]}
			styles={editorStyles}
		/>
	</div>

	<div class="item">
		<h2>
			JSON {#if jsonError !== null}<span title={jsonError.message}>❌</span>{/if}
		</h2>
		<CodeMirror
			bind:value={jsonValue}
			on:change={handleJsonChange}
			lang={json()}
			styles={editorStyles}
		/>
	</div>
</section>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
	}
	:global(body) {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Ubuntu', 'Roboto',
			'Noto Sans', 'Droid Sans', sans-serif;
	}
	:global(code) {
		font-family: ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', 'Ubuntu Mono', 'Roboto Mono', Menlo,
			Monaco, Consolas, monospace;
	}

	:global(.codemirror-wrapper) {
		flex-grow: 1;
	}

	.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		height: 100%;
	}

	.item {
		height: calc(100% - 140px);
		width: 48%;
		flex: 1 1 auto;
		display: flex;
		flex-direction: column;
	}

	.item:nth-child(3n-2) {
		height: 120px;
		width: 100%;
		flex: 0 1 auto;
	}
</style>
