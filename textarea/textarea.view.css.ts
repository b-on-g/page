namespace $ {

	$mol_style_attach( "bog/page/textarea/textarea.view.css",
		`[bog_page_textarea] [mol_textarea_edit] {
	color: var(--mol_theme_text) !important;
	caret-color: var(--mol_theme_text);
}

[bog_page_textarea] [mol_text_code] {
	display: none;
}

[bog_page_textarea] [mol_textarea_edit] {
	position: relative;
	height: auto;
	min-height: 100%;
}
`
	)

}
