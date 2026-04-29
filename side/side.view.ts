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

		@$mol_mem
		body_text(next?: string) {
			const e = this.entry()
			if (!e) return ''
			if (next !== undefined) {
				e.Body('auto')?.val(next)
				return next
			}
			const raw = e.Body()?.val() ?? ''
			return raw.replace(/\n?""[^"\n]*?\\(?!https?:\/\/)[^"\n]*?""\n?/g, '')
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
			const name = `pasted-${Date.now()}.jpg`
			$mol_wire_async(this).save_image(file, name)
			return null
		}

		compress_image(file: File): Promise<Blob> {
			const max = 1920
			const quality = 0.85
			return new Promise((done, fail) => {
				const img = new $mol_dom_context.Image()
				const blobUrl = URL.createObjectURL(file)
				img.onload = () => {
					try {
						const ratio = Math.min(1, max / Math.max(img.width, img.height))
						const w = Math.round(img.width * ratio)
						const h = Math.round(img.height * ratio)
						const canvas = $mol_dom_context.document.createElement('canvas')
						canvas.width = w
						canvas.height = h
						const ctx = canvas.getContext('2d')!
						ctx.drawImage(img, 0, 0, w, h)
						canvas.toBlob(
							blob => {
								URL.revokeObjectURL(blobUrl)
								blob ? done(blob) : fail(new Error('toBlob null'))
							},
							'image/jpeg',
							quality,
						)
					} catch (err) {
						URL.revokeObjectURL(blobUrl)
						fail(err)
					}
				}
				img.onerror = () => {
					URL.revokeObjectURL(blobUrl)
					fail(new Error('image load failed'))
				}
				img.src = blobUrl
			})
		}

		save_image(file: File, name: string) {
			const entry = this.entry()
			if (!entry) return
			const images = entry.Images('auto')!
			const store = images.make([[null, $giper_baza_rank_post('just')]]) as $giper_baza_file
			if (store.chunks().length > 0) return
			const uri = `?BAZA:file=${store.link()};name=${name}`
			const snippet = `\n""${name}\\${uri}""\n`
			if (!this.body_text().includes(snippet)) {
				this.insert_at_cursor(snippet)
			}
			const blob = $mol_wire_sync(this).compress_image(file)
			store.blob(blob)
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
