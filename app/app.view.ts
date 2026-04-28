namespace $.$$ {

	export class $bog_page_app extends $.$bog_page_app {

		@$mol_mem
		store() {
			return $bog_page_store.make({ $: this.$ })
		}

		@$mol_mem
		registry() {
			return this.store().registry()
		}

		@$mol_mem
		current_page_link(next?: string) {
			return this.$.$mol_state_arg.value('page', next) ?? ''
		}

		@$mol_mem
		page_links() {
			return this.registry().Pages()?.remote_list() ?? []
		}

		@$mol_mem
		screen_body() {
			if (this.current_page_link()) return [this.Editor(this.current_page_link())]
			const list = this.page_links()
			if (!list.length) return [this.Empty_hint(), this.Pages_list()]
			return [this.Pages_list()]
		}

		@$mol_mem
		page_rows() {
			return this.page_links().map((_, i) => this.Page_card(String(i)))
		}

		page_entry(key: string) {
			return this.page_links()[Number(key)] as $bog_page_entry | undefined
		}

		page_title(key: string) {
			return this.page_entry(key)?.Title()?.val() ?? 'Untitled'
		}

		@$mol_action
		open_page(key: string) {
			const entry = this.page_entry(key)
			if (!entry) return
			this.current_page_link(entry.land().link().str)
		}

		@$mol_action
		delete_page(key: string) {
			const entry = this.page_entry(key)
			if (!entry) return
			this.registry().Pages('auto')!.cut(entry.link())
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
