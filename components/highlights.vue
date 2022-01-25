<template lang="html">
  <section class="c-highlights o-container-wide o-space o-space-inner">

    <h2 class="t-headline o-margins">Latest News</h2>

    <div class="c-highlights--scroller u-hide-scrollbars">

        <template v-for="item in [...data.items,...data.items]">
          <div class="c-card">
            <div class="c-image--wrapper">
              <div class="c-image" v-image:cover="item.image.url"/>
            </div>
            <div class="c-description" v-html="'This is a long descriptive headline about the article'"/>
            <span class="c-date" v-html="'January 12th, 2022'"/>
          </div>
        </template>

    </div>

  </section>
</template>

<script>
export default {
  props: ["data"],
};
</script>

<style lang="scss">
.c-highlights {
  background: white;
  color: $black;

  .c-highlights--scroller{
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 10px 0px;
    &::after,
    &::before{
      content: '';
      flex: 0 0 $s-margin;
    }
  }

  .c-card{
    flex: 0 0 auto;
    width: 70vw;
    margin-right: 5vw;
    display: flex;
    flex-direction: column;
    &:last-child{
      margin-right: 0px;
    }
  }

  .c-image--wrapper{
    flex: 0 0 auto;
    width: 100%;
    position: relative;
    padding-bottom: 56.25%;
    overflow: hidden;
    transform: translateZ(0)
  }
  .c-image{
    @include cover;
    transition: transform .5s;
    transform: scale(1.1);
  }
  .c-description{
    margin-top: 18px;
    max-width: 60ch;
    font-size: 18px;
    font-weight: 800;
    line-height: 1.2;
    transition: color .5s;
  }
  .c-date{
    font-size: 12px;
    margin-top: 12px;
    opacity: .5;
    transition: opacity .5s;
  }

  @media screen and (min-width: $medium){

    .c-highlights--scroller{
      &::after,
      &::before{
        content: '';
        flex: 0 0 $m-margin;
      }
    }

    .c-card{
      width: 20rem;
      margin-right: 1.5rem;
    }
    .c-description{
      margin-top: 20px;
      font-size: 20px;
    }
    .c-date{
      font-size: 13px;
      margin-top: 13px;
    }

  }

  @media screen and (min-width: $huge){

    .c-highlights--scroller{
      &::after,
      &::before{
        content: '';
        flex: 0 0 $h-margin;
      }
    }

    .c-description{
      font-size: 22px;
    }
    .c-date{
      font-size: 14px;
    }

  }
}

.c-highlights .c-card:active,
.c-highlights .c-card:focus,
.is-desktop .c-highlights .c-card:hover{
  .c-description{
    color: $purple;
  }
  .c-image{
    transform: scale(1.05);
  }
  .c-date{
    opacity: 1;
  }
}
</style>
