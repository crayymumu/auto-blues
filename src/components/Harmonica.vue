<template>
  <section class="harmonica">
    <div class="cover">
      <span class="screws left"></span>
      <span class="plate"></span>
      <span class="screws right"></span>
    </div>
    <div class="reeds blow"></div>
    <div class="comb">
      <div class="holes" data-hole="1">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="2">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="3">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="4">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="5">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="6">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="7">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="8">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="9">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
      <div class="holes" data-hole="10">
        <span class="reed"></span>
        <span class="rivet"></span>
      </div>
    </div>
    <div class="reeds draw"></div>
    <div class="cover">
      <span class="screws bottom left"></span>
      <span class="plate bottom"></span>
      <span class="screws bottom right"></span>
    </div>
  </section>
</template>

<script>
export default {
name: "Harmonica"
}
</script>

<style lang="less">
.harmonica {
  display: flex;
  flex-direction: column;
  width: 405px;
  height: 82px;

  > .cover {
    display: flex;
    justify-content: center;

    > .screws {
      width: 32px;
      height: 2px;
      background: linear-gradient(to bottom, rgba(204, 204, 204, 1) 0%, rgba(51, 51, 51, 1) 95%, rgba(0, 0, 0, 1) 100%);
      align-self: flex-end;

      &.left {
        border-top-left-radius: 2px;
      }
      &.right {
        border-top-right-radius: 2px;
      }
      &.bottom {
        background: linear-gradient(to top, rgba(204, 204, 204, 1) 0%, rgba(51, 51, 51, 1) 95%, rgba(0, 0, 0, 1) 100%);
        align-self: flex-start;

        &.left {
          border-top-left-radius: 0;
          border-bottom-left-radius: 2px;
        }
        &.right {
          border-top-right-radius: 0;
          border-bottom-right-radius: 2px;
        }
      }
    }
    > .plate {
      display: flex;
      width: 333px;
      height: 24px;
      border-radius: 10px 10px 0 0;
      background: linear-gradient(to bottom, #000000 0%,#777777 5%,#000000 10%,#555555 30%,#888888 50%,#e2e2e2 70%,#cccccc 95%,#000000 100%,#000000 100%,#777777 100%);

      &.bottom {
        border-radius: 0 0 10px 10px;
        background: linear-gradient(to bottom, #777777 0%,#000000 0%,#000000 0%,#cccccc 5%,#e2e2e2 30%,#888888 50%,#555555 70%,#000000 90%,#777777 95%,#000000 100%);
      }
    }
  }
  > .reeds {
    height: 3px;
    background: linear-gradient(to bottom, rgba(156, 128, 68, 1) 20%,rgba(196, 161, 85, 1) 50%,rgba(156, 128, 68, 1) 80%);

    &.blow {
      border-radius: 2px 2px 0 0;
    }
    &.draw {
      border-radius: 0 0 2px 2px;
    }
  }
  > .comb {
    display: flex;
    justify-content: center;
    flex: 1;
    background-image: linear-gradient(90deg, rgba(133,68,12, .9) 50%, transparent 50%),
    linear-gradient(90deg, rgba(133,68,12, .9) 50%, transparent 50%),
    linear-gradient(90deg, transparent 50%, rgba(133,68,12, .9) 50%),
    linear-gradient(90deg, transparent 50%, rgba(133,68,12, .9) 50%);
    background-size: 2px, 3px, 4px, 6px;

    > .holes {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 18px;
      height: 100%;
      margin: 0 6.5px;
      background-color: black;
      position: relative;

      &:before {
        content: attr(data-hole);
        display: block;
        font-size: 12px;
        font-weight: 100;
        color: #ccc;
        text-align: center;
        position: absolute;
        top: -15px;
        left: 5px;
      }
      &:last-child {
        &:before {
          left: 1px;
        }
      }
      > .reed {
        display: flex;
        width: 15px;
        height: 1px;
        background: linear-gradient(to right, rgba(156, 128, 68, 1) 20%, rgba(196, 161, 85, 1) 50%, rgba(156, 128, 68, 1) 80%);
      }
      > .rivet {
        display: flex;
        width: 5px;
        height: 2px;
        background: linear-gradient(to right, rgba(19, 16, 8, 1) 1%, rgba(196, 161, 85, 1) 50%, rgba(19, 16, 8, 1) 100%);
      }
    }
  }
}
</style>
