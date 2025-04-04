<script>
	import CodeMirror from 'svelte-codemirror-editor';
	import { json } from '@codemirror/lang-json';
	import { StreamLanguage } from '@codemirror/language';
	import { toml } from '@codemirror/legacy-modes/mode/toml';
	import * as TOML from '@ltd/j-toml';

	import { sampleTOML } from '../lib/sample';

	const editorStyles = {
		'&': {
			display: 'flex',
			width: '100%',
			height: '100%',
			'flex-grow': 1
		},
		'.cm-content': {
			'font-family': `ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', 'Ubuntu Mono', 'Roboto Mono', Menlo,
			Monaco, Consolas, monospace`
		}
	};

	let tomlValue = $state(sampleTOML);
	let tomlError = $state(null);
	let jsonValue = $state('');
	let jsonError = $state(null);

	const handleTomlChange = ({ detail }) => {
		try {
			const toml = TOML.parse(detail, { bigint: false, joiner: '\n' });
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

	(function () {
		handleTomlChange({ detail: tomlValue });
	})();
</script>

<svelte:head>
	<title>Online TOML to JSON converter</title>
</svelte:head>

<main class="container">
	<header>
		<h1>Online TOML to JSON converter</h1>
		<p>
			Convert TOML to JSON or JSON to TOML right here on this page (<code>toml2json</code> or
			<code>json2toml</code>). The source code is on
			<a href="https://github.com/matiaskorhonen/online-toml-to-json">GitHub</a>.
		</p>
	</header>

	<section class="editors">
		<div class="editor">
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

		<div class="editor">
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
</main>

<style>
	:global(html, body) {
		height: 100%;
		margin: 0;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			'Ubuntu',
			'Roboto',
			'Noto Sans',
			'Droid Sans',
			sans-serif;
	}

	:global(code) {
		font-family:
			ui-monospace, 'Cascadia Mono', 'Segoe UI Mono', 'Ubuntu Mono', 'Roboto Mono', Menlo, Monaco,
			Consolas, monospace;
	}

	:global(.codemirror-wrapper) {
		flex-grow: 1;
	}

	.container {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	header {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		margin: 0 2.5rem;
	}

	.editors {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
	}

	.editor {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		max-width: 50%;
	}

	@media (max-width: 40em) {
		.editors {
			display: flex;
			flex-direction: column;
			flex-grow: 1;
		}

		.editor {
			max-width: 100%;
		}
	}

	.editor h2 {
		padding-left: 2.5rem;
	}
</style>
