<script>
/*
 * @Author: 焦质晔
 * @Date: 2021-02-13 14:02:56
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-29 10:08:38
 */
import { defineComponent } from 'vue';
import config from '@/config';
import ScreenFull from '../ScreenFull';
import ThemePicker from '../ThemePicker';
import LangSelect from '../LangSelect';
import SizeSelect from '../SizeSelect';
import HelperDoc from '../HelperDoc';
import NoticeCenter from '../NoticeCenter';
import UserCenter from '@/pages/userCenter/index';

export default defineComponent({
  name: 'HeadNavBar',
  render() {
    return (
      <div class="header__user-operation">
        {config.showScreenFull && <ScreenFull />}
        {config.showHelperDoc && <HelperDoc />}
        {config.showCustomTheme && <ThemePicker />}
        {config.showSizeSelect && <SizeSelect />}
        {config.showLangSelect && <LangSelect />}
        {config.showNotification && <NoticeCenter />}
        <UserCenter />
      </div>
    );
  },
});
</script>

<style lang="scss">
.header__user-operation {
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: $moduleMargin;
}
</style>
