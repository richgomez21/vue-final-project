<template>
  <div class="artist-list">
      <button type="button" class="btn btn-dark" @click="$router.push({ name: 'AddArtist' })">Add New Artist</button>
      <br><br>
      <table align="center" class="table table-hover table-dark">
          <thead>
              <tr>
                  <th scope="col">Artist</th>
                  <th scope="col">Email</th>
                  <th scope="col">Genre</th>
                  <th scope="col">Active</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="artist in artists" :key="artist.id">
                  <td>{{ artist.name }}</td>
                  <td>{{ artist.email }}</td>
                  <td>{{ getGenreNameById(artist.genreId) }}</td>
                  <td>{{ artist.active ? 'yes' : 'no' }}</td>
                  <td>
                      <button type="button" class="btn btn-secondary" @click="editArtist(artist.id)">Edit</button>
                  </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import { getAllArtists, getAllGenres } from "@/api";

export default {
  data() {
      return {
          artists: [],
          genres: [],
      };
  },
  mounted() {
      getAllArtists().then((artists) => (this.artists = artists));
      getAllGenres().then((genres) => (this.genres = genres));
  },
  methods: {
      getGenreNameById(id) {
          const genre = this.genres.find((g) => g.id == id);
          return genre?.name;
          // Note the nullish operator - This method might get called before genres have been fetched.
      },
      editArtist(id) {
          this.$router.push({ name: 'ArtistDetails', params: { artistId: id } });
      },
  },
};
</script>

<style>
  /* Add your styles here if needed */
</style>
