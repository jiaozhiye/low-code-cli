<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 10:11:34
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-02-14 16:00:01
 */
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import { currentSize } from '@/mixins/sizeMixin';

export default defineComponent({
  name: 'Breadcrumb',
  mixins: [currentSize],
  computed: {
    ...mapState('app', ['navList']),
    // breadcrumbs() {
    //   return this.$route.matched
    //     .map((x) => {
    //       let { path: key, meta } = x;
    //       let { title = '', breadcrumb = true } = meta;
    //       if (!key) key = '/';
    //       return { key, title, breadcrumb };
    //     })
    //     .filter((x) => x.breadcrumb && !x.key.startsWith('/redirect'));
    // },
    breadcrumbs() {
      const { path } = this.$route;
      return path === '/home'
        ? [this.deepMapRoutes(this.$router.options.routes, 'path', path).meta.title]
        : this.matchRoutes(this.navList, path);
    },
  },
  methods: {
    matchRoutes(menus, path) {
      let res = [];
      let target = this.deepMapRoutes(menus, 'key', path) || {};
      if (target.parentKey) {
        res = this.matchRoutes(menus, target.parentKey);
      }
      if (target.title) {
        res.push(target.title);
      }
      return res;
    },
    deepMapRoutes(arr, key, mark) {
      let res = null;
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i].children)) {
          res = this.deepMapRoutes(arr[i].children, key, mark);
        }
        if (res) {
          return res;
        }
        if (arr[i][key] === mark) {
          return arr[i];
        }
      }
      return res;
    },
  },
  render() {
    const cls = {
      [`app-breadcrumb`]: !0,
      [`app-breadcrumb-sm`]: this.$size === 'small',
      [`app-breadcrumb-lg`]: this.$size === 'large',
    };
    return (
      <div class={cls}>
        <span class="location">{this.$t('app.dreadcrumb.location')}&nbsp;:&nbsp;</span>
        <el-breadcrumb separator="/">
          {this.breadcrumbs.map((x) => (
            <el-breadcrumb-item key={x}>{x}</el-breadcrumb-item>
          ))}
        </el-breadcrumb>
      </div>
    );
  },
});
</script>

<style lang="scss">
.app-breadcrumb {
  display: flex;
  padding: $modulePadding $modulePadding 0;
  font-size: $textSize;
  .location {
    line-height: 1;
  }
  .el-breadcrumb {
    font-size: inherit;
  }
  // 52 48 44
  &-sm {
    font-size: $textSizeSecondary;
  }
  &-lg {
  }
}
</style>
