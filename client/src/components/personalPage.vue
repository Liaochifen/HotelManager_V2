<template>
  <div>
    <div class="contentCenter">
      <div class="page">
        <span>帳號詳細內容</span>
      </div>
    </div>
    <div class="wrap">
      <div class="accountPersonalMenu">
        <ul>
          <li><button @click="accountPage(0)">個人資料</button></li>
          <li><button @click="accountPage(1)">修改密碼</button></li>
          <li><button @click="accountPage(2)">歷史記錄</button></li>
        </ul>
      </div>
      <div class="accountPersonalInfo">
        <div class="accountPersonalBG" v-if="blockarea === 0">
          <div class="accountInfoDetails">
            <p>員工編號</p>
            <input type="text" readonly v-model="userAccountDetail.employeeNumber" id="employeeNumber"/>
          </div>
          <div class="accountInfoDetails">
            <p>所屬單位</p>
            <input type="text" readonly v-model="userAccountDetail.department" id="department"/>
          </div>
          <div class="accountInfoDetails">
            <p>姓名</p>
            <input type="text" readonly v-model="userAccountDetail.userName" id="userName"/>
          </div>
          <div class="accountInfoDetails">
            <p>使用者權限</p>
            <!-- disabled -->
            <select v-model="userAccountDetail.employeeLimit"  id="limit">
              <option>一般使用者</option>
              <option>主管使用者</option>
              <option>後台管理者</option>
            </select>
          </div>
          <div class="clear"></div>
          <div class="accountInfoDetails">
            <p>信箱</p>
            <input type="text" readonly v-model="userAccountDetail.email" id="email"/>
          </div>
          <div class="accountInfoDetails pw">
            <p>密碼</p>
            <input class="form-control"  type="password"  readonly="readonly"  v-model="userAccountDetail.password"  id="password"/>
              <span id="passwordIcon" v-on:click="changePassword" v-if="pass_type === 'password'"><font-awesome-icon icon="eye"/></span>
              <span id="passwordIcon" v-on:click="changePassword" v-else><font-awesome-icon icon="eye-slash"/></span>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>