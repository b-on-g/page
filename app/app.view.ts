namespace $.$$ {

	export class $bog_page_app extends $.$bog_page_app {

		@$mol_mem
		store() {
			return $bog_page_store.make({ $: this.$ })
		}

		registry() {
			return this.store().registry()
		}

		@$mol_mem
		current_page_link(next?: string) {
			return this.$.$mol_state_arg.value('page', next) ?? ''
		}

		page_links() {
			return this.registry().Pages()?.remote_list() ?? []
		}

		@$mol_mem
		ensure_default_page() {
			if (this.current_page_link()) return null
			if (this.page_links().length) {
				const first = this.page_links()[0] as $bog_page_entry
				this.current_page_link(first.land().link().str)
				return null
			}
			this.create()
			return null
		}

		sidebar_items() {
			const items: $mol_view[] = [this.Create_item()]
			this.page_links().forEach((_, i) => items.push(this.Page_item(String(i))))
			return items
		}

		page_entry(key: string) {
			return this.page_links()[Number(key)] as $bog_page_entry | undefined
		}

		page_title(key: string) {
			return this.page_entry(key)?.Title()?.val() ?? 'Untitled'
		}

		page_active(key: string) {
			const e = this.page_entry(key)
			if (!e) return false
			return e.land().link().str === this.current_page_link()
		}

		@$mol_action
		open_page(key: string) {
			const entry = this.page_entry(key)
			if (!entry) return
			this.current_page_link(entry.land().link().str)
		}

		@$mol_action
		create() {
			const pages = this.registry().Pages('auto')!
			const count = this.page_links().length
			const entry = pages.make([[null, $giper_baza_rank_post('just')]])
			entry.Title('auto')?.val(`New page ${count + 1}`)
			entry.Body('auto')?.val('')
			this.current_page_link(entry.land().link().str)
		}

		@$mol_action
		back_to_list() {
			this.current_page_link(null as any)
		}

	}

}
