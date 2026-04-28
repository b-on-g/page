namespace $.$$ {

	export class $bog_page_side extends $.$bog_page_side {

		entry() {
			const link = this.page_link()
			if (!link) return null
			const land = this.$.$giper_baza_glob.Land(new $giper_baza_link(link))
			return land.Data($bog_page_entry) as $bog_page_entry
		}

		title(next?: string) {
			const e = this.entry()
			if (!e) return ''
			if (next !== undefined) {
				e.Title('auto')?.val(next)
				return next
			}
			return e.Title()?.val() ?? ''
		}

		body_text(next?: string) {
			const e = this.entry()
			if (!e) return ''
			if (next !== undefined) {
				e.Body('auto')?.val(next)
				return next
			}
			return e.Body()?.val() ?? ''
		}

		body_html() {
			return this.$.$hyoo_marked_to_html(this.body_text())
		}

		download_blob() {
			return new $mol_dom_context.Blob([this.body_text()], { type: 'text/x-marked' })
		}

		download_name() {
			const t = this.title().trim() || 'page'
			return `${t.replaceAll(/[^\w\-]+/g, '_')}.mt`
		}

		body_node() {
			return this.Edit_view().Edit().dom_node() as HTMLTextAreaElement
		}

		insert_at_cursor(text: string) {
			const node = this.body_node()
			const start = node.selectionStart ?? this.body_text().length
			const end = node.selectionEnd ?? start
			const current = this.body_text()
			const next = current.slice(0, start) + text + current.slice(end)
			this.body_text(next)
			const pos = start + text.length
			$mol_wire_async(node).setSelectionRange(pos, pos)
		}

		paste_image(event?: Event | null) {
			const e = event as ClipboardEvent | null
			if (!e?.clipboardData) return null
			const item = Array.from(e.clipboardData.items).find(i => i.type.startsWith('image/'))
			if (!item) return null
			const file = item.getAsFile()
			if (!file) return null
			e.preventDefault()
			this.save_image(file)
			return null
		}

		@$mol_action
		save_image(file: File) {
			const entry = this.entry()
			if (!entry) return
			const images = entry.Images('auto')!
			const store = images.make([[null, $giper_baza_rank_post('just')]]) as $giper_baza_file
			const ext = (file.type.split('/')[1] || 'png').replace(/[^\w]/g, '')
			const name = `pasted-${Date.now()}.${ext}`
			const renamed = new $mol_dom_context.File([file], name, { type: file.type })
			store.blob(renamed)
			const uri = store.uri()
			const snippet = `\n""${name}\\${uri}""\n`
			this.insert_at_cursor(snippet)
		}

		body_view() {
			return this.editing() ? this.Edit_view() : this.View_wrap()
		}

		@$mol_action
		start_edit(event?: Event | null) {
			this.editing(true)
			$mol_wire_async(this.Edit_view().Edit()).bring()
		}

	}

}
