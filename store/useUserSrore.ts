import { defineStore, storeToRefs } from "pinia";
import { useSupabaseClient } from "#imports";

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [] as any,
    user: null as any,
  }),

  actions: {
    // 🔹 CREATE
    async createUser(userData: any) {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase
        .from("users")
        .upsert([userData], { onConflict: "user_id" })
        .select()
        .single();

      if (error) throw new Error(error.message);
      this.user = data;
      return data;
    },

    // 🔹 READ (one)
    async getUserById(id: string) {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", id)
        .single();

      if (error) throw new Error(error.message);
      this.user = data;
      return data;
    },

    // 🔹 READ (all)
    async getAllUsers() {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw new Error(error.message);
      this.users = data;
      return data;
    },

    // 🔹 UPDATE
    async updateUser(id: string, updates: any) {
      const supabase = useSupabaseClient();

      const { data, error } = await supabase
        .from("users")
        .update(updates)
        .eq("user_id", id)
        .select()
        .single();

      if (error) throw new Error(error.message);
      this.user = data;
      return data;
    },

    // 🔹 DELETE
    async deleteUser(id: string) {
      const supabase = useSupabaseClient();

      const { error } = await supabase
        .from("users")
        .delete()
        .eq("user_id", id);

      if (error) throw new Error(error.message);
      this.user = null;
    },
  },
});

export const useUserStoreRefs = () => storeToRefs(useUserStore());