namespace $ {

	/** One page (article) */
	export class $bog_page_entry extends $giper_baza_dict.with({
		Title: $giper_baza_atom_text,
		Body: $giper_baza_atom_text,
		Aura: $giper_baza_atom_text,
		Images: $giper_baza_list_link_to(() => $giper_baza_file),
	}) {}

	/** Data registry in home land */
	export class $bog_page_registry extends $giper_baza_entity.with({
		Pages: $giper_baza_list_link_to(() => $bog_page_entry),
	}) {}

	/** Data store */
	export class $bog_page_store extends $mol_object {

		glob() {
			return this.$.$giper_baza_glob
		}

		home_land() {
			return this.glob().home().land()
		}

		registry() {
			return this.home_land().Data($bog_page_registry) as $bog_page_registry
		}

	}

}
