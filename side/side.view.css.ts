namespace $.$$ {
	$mol_style_define($bog_page_side, {
		flex: { grow: 1, shrink: 1, basis: 0 },
		Head: {
			width: '100%',
			maxWidth: '48rem',
			alignSelf: 'center',
		},
		Edit_view: {
			flex: { grow: 1 },
			minHeight: '70vh',
			width: '100%',
			maxWidth: '48rem',
			alignSelf: 'center',
		},
		View_wrap: {
			flex: { grow: 1 },
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			maxWidth: '48rem',
			alignSelf: 'center',
			cursor: 'text',
			padding: { left: $mol_gap.block, right: $mol_gap.block },
			minHeight: '70vh',
		},
		Render: {
			flex: { grow: 1 },
			width: '100%',
		},
		Title_field: {
			flex: { grow: 1 },
			fontSize: '1.25rem',
		},
	})
}
