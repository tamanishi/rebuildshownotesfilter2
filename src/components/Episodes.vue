<template>
  <div class="episodes">
    <b-container>
      <h1>Rebuild Shownotes Filter</h1>
      <b-row>
        <b-col cols="3">
          <b-form-input v-model="query" type="text" placeholder="query"></b-form-input>
        </b-col>
      </b-row>
      <div v-for="episode in episodes" v-bind:key="episode.title">
        <p>
          <div v-for="(shownote, index) in filtered = (filteredShownotes(episode.shownotes))">
            <div v-show="index === 0">
              <span class="epititle"><a :href=episode.mediaUrl target=_blank>{{ episode.title }}</a></span> <span class="pubdate">({{ episode.publicationDate | moment('YYYY/MM/DD') }})</span>
            </div>
            <li>
              <a :href=shownote.url target=_blank>{{ shownote.title }}</a>
            </li>
          </div>
        </p>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Episodes',
  data () {
    return {
      episodes: [],
      query: ''
    }
  },
  mounted () {
    try {
      const self = this
      axios.get('./static/episodes.json')
      .then(function (res) {
        self.episodes = res.data.episodes
      })
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    filteredShownotes: function (shownotes) {
      let query = this.query
      return shownotes.filter(function (shownote) {
        return shownote.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.epititle {
  font-weight: bolder;
  font-size: larger;
}

.pubdate {
  font-weight: lighter;
  font-size: small;
}
</style>
