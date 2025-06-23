import { defineStore, storeToRefs } from "pinia";
import { useSupabaseClient } from "#imports";


export const usePlacesStore = defineStore("places", {
  state: () => ({
    places: null as any,
    placeTypes: null as any,
  }),
  
  actions: {
    async selectPlaces() {
      const supabase = useSupabaseClient();
      try {
        let { data: places, error } = await supabase
        .from('places')
        .select('id')
      } catch (error) {
        
      }
    },

    async selectTypePlaces() {
      const supabase = useSupabaseClient();
      try {
        
        let { data: places_types, error } = await supabase
        .from('places_types')
        .select('*')
        this.placeTypes = places_types;
      } catch (error) {
        
      }
    },
    
    async createPlace(placeData: any) {
      try {
        const supabase = useSupabaseClient();
        const { data, error } = await supabase
          .from('places')
          .insert([placeData])
  .select()
      } catch (error) {
        
      }
    }
  },
});

export const usePlacesStoreRefs = () => storeToRefs(usePlacesStore());