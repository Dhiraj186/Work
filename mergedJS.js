Ext.ClassManager.getByAlias('controller.uxsohoappmenucontroller').prototype.onTreeItemSelected = function (d, a, f, e, b) {
  if (EAM.Utils.getScreen().userFunction == "DUPLGD" && a.get('url').indexOf("DUPLGD") < 0 && a.isLeaf()) {
    var allComponents = Ext.ComponentQuery.query('[cust_object=shutdown_planning]');
    allComponents.forEach(function (rec) {
      if (Ext.getCmp(rec.id)) {
        console.log('delete cmp ' + rec.id);
        try {
          Ext.getCmp(rec.id).destroy();
        } catch (err) {}
      }
    })

    document.querySelectorAll('style[id^="gantt-static"]').forEach(function (styleTag) {
      styleTag.remove();
    });

    var divsWithAttribute = document.querySelectorAll('div[cust_object=shutdown_planning]');
    divsWithAttribute.forEach(function (rec) {
      if (document.getElementById(rec.id)) {
        console.log('delete div  ' + rec.id);
        document.getElementById(rec.id).parentElement.removeChild(document.getElementById(rec.id));
      };

    })

    var _elementStyle = document.getElementsByTagName("style")
      var vListOfStyleToDelete = [];
    for (var i = 0; i < _elementStyle.length; i++) {
      if (_elementStyle[i].id) {
        if (_elementStyle[i].id.indexOf("dhtmlx") > -1) {
          vListOfStyleToDelete.push(_elementStyle[i].id);
        }
      }
    }
    if (vListOfStyleToDelete.length > 0) {
      for (var i = 0; i < vListOfStyleToDelete.length; i++) {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(vListOfStyleToDelete[i]));
      }
    }
    var _elementScript = document.getElementsByTagName("script")
      var vListOfScriptToDelete = [];
    for (var i = 0; i < _elementScript.length; i++) {
      if (_elementScript[i].id) {
        if (_elementScript[i].id.indexOf("dhtmlx") > -1) {
          ////console.log("on supprime " + _elementScript[i].id)
          vListOfScriptToDelete.push(_elementScript[i].id);
        }
      }
    }
    if (vListOfScriptToDelete.length > 0) {
      for (var i = 0; i < vListOfScriptToDelete.length; i++) {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(vListOfScriptToDelete[i]));
      }
    }
  }

  var c = b.getKey();
  if (b.type === 'keydown') {
    if (!(b.ENTER === c || b.SPACE === c)) {
      return
    }
  }
  if (a) {
    if (a.isExpandable()) {
      a[a.isExpanded() ? 'collapse' : 'expand']()
    }
    if (a.isLeaf()) {
      if (a.get('url')) {
        this.doLaunch(a.get('url'))
      }
    }
  }

}
Ext.ClassManager.getByAlias('controller.mainmenubarcontroller').prototype.onLaunchClick = function (a) {
  'use strict'
  ////console.log('debug 1');
  if (EAM.Utils.getScreen().userFunction == "DUPLGD" && a.initialConfig.url.indexOf("DUPLGD") < 0) {

    document.querySelectorAll('style[id^="gantt-static"]').forEach(function (styleTag) {
      styleTag.remove();
    });

    var allComponents = Ext.ComponentQuery.query('[cust_object=shutdown_planning]');
    allComponents.forEach(function (rec) {
      if (Ext.getCmp(rec.id)) {
        console.log('delete cmp ' + rec.id);
        try {
          Ext.getCmp(rec.id).destroy();
        } catch (err) {}
      }
    })

    var divsWithAttribute = document.querySelectorAll('div[cust_object=shutdown_planning]');
    divsWithAttribute.forEach(function (rec) {
      if (document.getElementById(rec.id)) {
        console.log('delete div  ' + rec.id);
        document.getElementById(rec.id).parentElement.removeChild(document.getElementById(rec.id));
      };

    })

    var _elementStyle = document.getElementsByTagName("style")
      var vListOfStyleToDelete = [];
    for (var i = 0; i < _elementStyle.length; i++) {
      if (_elementStyle[i].id) {
        if (_elementStyle[i].id.indexOf("dhtmlx") > -1) {
          vListOfStyleToDelete.push(_elementStyle[i].id);
        }
      }
    }
    if (vListOfStyleToDelete.length > 0) {
      for (var i = 0; i < vListOfStyleToDelete.length; i++) {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(vListOfStyleToDelete[i]));
      }
    }
    var _elementScript = document.getElementsByTagName("script")
      var vListOfScriptToDelete = [];
    for (var i = 0; i < _elementScript.length; i++) {
      if (_elementScript[i].id) {
        if (_elementScript[i].id.indexOf("dhtmlx") > -1) {
          ////console.log("on supprime " + _elementScript[i].id)
          vListOfScriptToDelete.push(_elementScript[i].id);
        }
      }
    }
    if (vListOfScriptToDelete.length > 0) {
      for (var i = 0; i < vListOfScriptToDelete.length; i++) {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(vListOfScriptToDelete[i]));
      }
    }
  }
  if (a.url) {
    this.doLaunch(a.url)
  }
};
Ext.define('globalFunctions', {
  singleton: true,
  alternateClassName: 'formatDate',
  formatDate: function (vDate) {
    var vMonth = vDate.getMonth() + 1;
    var vDay = vDate.getDate();
    var vYear = vDate.getFullYear();
    return ("0" + vMonth.toString()).slice(-2) + '/' + ("0" + vDay.toString()).slice(-2) + '/' + vDate.getFullYear();

  }
});
Ext.override(Ext.form.field.ComboBox, {
  onDestroy: function () {
    this.bindStore(null);
    this.callParent();
  }
});

function refreshColumnfilter() {
  setTimeout(function () {
    document.querySelectorAll('input[data-column]').forEach(function (input) {

      input.addEventListener("input", function () {

        var column = this.getAttribute('data-column');
        if (this.value == null || this.value === "") {
          delete tGridFilters[column]
        } else {
          tGridFilters[column] = this.value
        }; // Met Ã  jour la variable de filtres dynamiques
        gantt.refreshData(); // Met Ã  jour l'affichage des tÃ¢ches
      });
    });

  }, 3000)
}

function onInputHeaderSearch() {

  var column = this.getAttribute('data-column');
  console.log('onInputHeaderSearch()');
  if (this.value == null || this.value === "") {
    delete tGridFilters[column]
  } else {
    tGridFilters[column] = this.value
  }; // Met Ã  jour la variable de filtres dynamiques
  gantt.refreshData(); // Met Ã  jour l'affichage des tÃ¢ches
}

function view_detail_supplier_trade(_1, _2, _3, _4) {

  var vXml = "<data>";
  var tasks = gantt.getTaskByTime();

  tasks.forEach(function (rec) {
    if (rec.type == "Activity") {
      if (rec.dds_act_supplier == _1 && rec.dds_act_supplier && Ext.Date.format(rec.start_date, 'm/d/Y') == _4) {
        if (  gantt.getChildren(rec.id).length == 0) {
          vXml += "<task>"
          vXml += "<wo>" + rec.id.split("#")[0] + "</wo>"
          vXml += "<equipment>" + rec.equipment + "</equipment>"
          vXml += toXml(me, 'obj_desc', rec.obj_desc)
          vXml += "<womrc>" + rec.womrc + "</womrc>"
          vXml += "<act>" + rec.id.split('#')[1] + "</act>"
          vXml += toXml(me, 'act_desc', rec.act_desc)
          vXml += "<act_trade>" + rec.dds_act_trade + "</act_trade>"
          vXml += "<act_persons>" + rec.dds_act_persons + "</act_persons>"
          vXml += "<act_est>" + rec.dds_act_est + "</act_est>"
          vXml += "<startdate>" + Ext.Date.format(rec.start_date, 'd/m/Y H:i') + "</startdate>"
          vXml += "<endate>" + Ext.Date.format(rec.end_date, 'd/m/Y H:i') + "</endate>"
          vXml += "</task>"
        }

      }
    }

  });
  vXml += "</data>";
  var vLoad = EAM.Ajax.request({
    url: "BSUDSC",
    params: {
      SYSTEM_FUNCTION_NAME: "BSUDSC",
      USER_FUNCTION_NAME: "XUDETF",
      CURRENT_TAB_NAME: null,
      FUNCTION_CLASS: "WEBD",
      removescreenflows: "yes",
      MENU_MODULE_KEY: 0
    }
  })

    try {
      var vUser = EAM.AppData.getInstallParams().get("user")
    } catch (err) {};
  if (!vUser) {
    var vUser = 'R5'
  };

  var vExistingSave = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      SYSTEM_FUNCTION_NAME: "XUDETF",
      USER_FUNCTION_NAME: "XUDETF",
      MADDON_FILTER_ALIAS_NAME_1: "wspf_10_user_code",
      MADDON_FILTER_OPERATOR_1: "=",
      MADDON_FILTER_JOINER_1: "AND",
      MADDON_FILTER_SEQNUM_1: "1",
      MADDON_FILTER_VALUE_1: vUser
    }
  });

  if (vExistingSave.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length == 0) {
    var vRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDETF",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_user_code: "*",
        SCROLLROW: "YES",
        pagemode: "view"
      }
    }).responseData.pageData.values;

    vRecord["processaction"] = "insert";
    vRecord["wspf_10_user_code"] = vUser;
    vRecord["wspf_10_c_data"] = vXml;

    var vStatus = EAM.Ajax.request({
      url: "BSUDSC.HDR.insertrecord?pageaction=SAVE",
      params: Ext.merge(vRecord, {
        CHECK_CF_CHANGEFLAG: "true",
        CURRENT_TAB_NAME: "HDR",
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDETF",
        can_update: "true",
      })
    });

    if (vStatus.success) {
      var vParams = {
        'USER_FUNCTION_NAME': "BSALPG",
        'gridname': "XUSUPD"
      };

      Ext.create('EAM.view.common.popups.Grid', {
        width: 1500,
        height: 900,
        id: 'custom_viewgrid',
        cust_object: 'shutdown_planning',
        resizable: !0,
        displayDataspy: !0,
        url: 'BSALPG',
        itemId: 'BSALPG',
        popCaption: "",
        popTitle: "",
        screen: EAM.Utils.getScreen(),
        callingPanel: EAM.Utils.getScreen().getCurrentTab().getFormPanel(),
        params: vParams,
        dialogButtons: ['close'],
        closable: !1
      }).show()

    }

  } else {

    var vRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDETF",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_user_code: vUser,
        SCROLLROW: "YES",
        pagemode: "view"
      }
    }).responseData.pageData.values;

    vRecord["processaction"] = "sync";
    vRecord["wspf_10_user_code"] = vUser;
    vRecord["wspf_10_c_data"] = vXml;

    var vStatus = EAM.Ajax.request({
      url: "BSUDSC.HDR.updaterecord?pageaction=SAVE",
      params: Ext.merge(vRecord, {
        CHECK_CF_CHANGEFLAG: "true",
        CURRENT_TAB_NAME: "HDR",
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDETF",
        can_update: "true",
      })
    });

    if (vStatus.success) {
      var vParams = {
        'USER_FUNCTION_NAME': "BSALPG",
        'gridname': "XUSUPD"
      };

      Ext.create('EAM.view.common.popups.Grid', {
        width: 1500,
        height: 900,
        id: 'custom_viewgrid',
        cust_object: 'shutdown_planning',
        resizable: !0,
        displayDataspy: !0,
        url: 'BSALPG',
        itemId: 'BSALPG',
        popCaption: "",
        popTitle: "",
        screen: EAM.Utils.getScreen(),
        callingPanel: EAM.Utils.getScreen().getCurrentTab().getFormPanel(),
        params: vParams,
        dialogButtons: ['close'],
        closable: !1
      }).show()

    }
  }
}
function view_detail_department_trade(_1, _2, _3, _4) {

  var vXml = "<data>";
  var tasks = gantt.getTaskByTime();

  tasks.forEach(function (rec) {
    if (rec.type == "Activity") {
      if (rec.dds_act_mrc == _1 && Ext.Date.format(rec.start_date, 'm/d/Y') == _4 && (rec.dds_act_supplier == "" || !rec.dds_act_supplier == "")) {
        if ( gantt.getChildren(rec.id).length == 0 ) {
          vXml += "<task>"
          vXml += "<wo>" + rec.id.split("#")[0] + "</wo>"
          vXml += "<equipment>" + rec.equipment + "</equipment>"
          vXml += toXml(me, 'obj_desc', rec.obj_desc)
          vXml += "<womrc>" + rec.womrc + "</womrc>"
          vXml += "<act>" + rec.id.split('#')[1] + "</act>"
          vXml += toXml(me, 'act_desc', rec.act_desc)
          vXml += "<act_trade>" + rec.dds_act_trade + "</act_trade>"
          vXml += "<act_persons>" + rec.dds_act_persons + "</act_persons>"
          vXml += "<act_est>" + rec.dds_act_est + "</act_est>"
          vXml += "<startdate>" + Ext.Date.format(rec.start_date, 'd/m/Y H:i') + "</startdate>"
          vXml += "<endate>" + Ext.Date.format(rec.end_date, 'd/m/Y H:i') + "</endate>"
          vXml += "</task>"
        }

      }
    }

  });
  vXml += "</data>";
  var vLoad = EAM.Ajax.request({
    url: "BSUDSC",
    params: {
      SYSTEM_FUNCTION_NAME: "BSUDSC",
      USER_FUNCTION_NAME: "XUDETF",
      CURRENT_TAB_NAME: null,
      FUNCTION_CLASS: "WEBD",
      removescreenflows: "yes",
      MENU_MODULE_KEY: 0
    }
  })

    try {
      var vUser = EAM.AppData.getInstallParams().get("user")
    } catch (err) {};
  if (!vUser) {
    var vUser = 'R5'
  };

  var vExistingSave = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      SYSTEM_FUNCTION_NAME: "XUDETF",
      USER_FUNCTION_NAME: "XUDETF",
      MADDON_FILTER_ALIAS_NAME_1: "wspf_10_user_code",
      MADDON_FILTER_OPERATOR_1: "=",
      MADDON_FILTER_JOINER_1: "AND",
      MADDON_FILTER_SEQNUM_1: "1",
      MADDON_FILTER_VALUE_1: vUser
    }
  });

  if (vExistingSave.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length == 0) {
    var vRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDETF",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_user_code: "*",
        SCROLLROW: "YES",
        pagemode: "view"
      }
    }).responseData.pageData.values;

    vRecord["processaction"] = "insert";
    vRecord["wspf_10_user_code"] = vUser;
    vRecord["wspf_10_c_data"] = vXml;

    var vStatus = EAM.Ajax.request({
      url: "BSUDSC.HDR.insertrecord?pageaction=SAVE",
      params: Ext.merge(vRecord, {
        CHECK_CF_CHANGEFLAG: "true",
        CURRENT_TAB_NAME: "HDR",
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDETF",
        can_update: "true",
      })
    });

    if (vStatus.success) {
      var vParams = {
        'USER_FUNCTION_NAME': "BSALPG",
        'gridname': "XUSUPD"
      };

      Ext.create('EAM.view.common.popups.Grid', {
        width: 1500,
        height: 900,
        id: 'custom_viewgrid',
        cust_object: 'shutdown_planning',
        resizable: !0,
        displayDataspy: !0,
        url: 'BSALPG',
        itemId: 'BSALPG',
        popCaption: "",
        popTitle: "",
        screen: EAM.Utils.getScreen(),
        callingPanel: EAM.Utils.getScreen().getCurrentTab().getFormPanel(),
        params: vParams,
        dialogButtons: ['close'],
        closable: !1
      }).show()

    }

  } else {

    var vRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDETF",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_user_code: vUser,
        SCROLLROW: "YES",
        pagemode: "view"
      }
    }).responseData.pageData.values;

    vRecord["processaction"] = "sync";
    vRecord["wspf_10_user_code"] = vUser;
    vRecord["wspf_10_c_data"] = vXml;

    var vStatus = EAM.Ajax.request({
      url: "BSUDSC.HDR.updaterecord?pageaction=SAVE",
      params: Ext.merge(vRecord, {
        CHECK_CF_CHANGEFLAG: "true",
        CURRENT_TAB_NAME: "HDR",
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDETF",
        can_update: "true",
      })
    });

    if (vStatus.success) {
      var vParams = {
        'USER_FUNCTION_NAME': "BSALPG",
        'gridname': "XUSUPD"
      };

      Ext.create('EAM.view.common.popups.Grid', {
        width: 1500,
        height: 900,
        id: 'custom_viewgrid',
        cust_object: 'shutdown_planning',
        resizable: !0,
        displayDataspy: !0,
        url: 'BSALPG',
        itemId: 'BSALPG',
        popCaption: "",
        popTitle: "",
        screen: EAM.Utils.getScreen(),
        callingPanel: EAM.Utils.getScreen().getCurrentTab().getFormPanel(),
        params: vParams,
        dialogButtons: ['close'],
        closable: !1
      }).show()

    }
  }
}
function adjust_existing_dep_capacity(_1, _2, _3, _4, _5) {
  var newLine = _1;

  var vGrid = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      GRID_NAME: "XUDEP2",
      GRID_TYPE: "LOV",
      REQUEST_TYPE: "LOV.HEAD_DATA.STORED",
      usagetype: "lov",
      LOV_ALIAS_NAME_1: "supplier_code",
      LOV_ALIAS_TYPE_1: "text",
      LOV_ALIAS_VALUE_1: Ext.getCmp("cust_supplier").getValue(),
      LOV_ALIAS_NAME_2: "supplier_org",
      LOV_ALIAS_TYPE_2: "text",
      LOV_ALIAS_VALUE_2: Ext.getCmp("cust_supplier_org").getValue(),
      LOV_ALIAS_NAME_3: "trade",
      LOV_ALIAS_TYPE_3: 'text',
      LOV_ALIAS_VALUE_3: '*',
      LOV_ALIAS_NAME_4: "startdate",
      LOV_ALIAS_TYPE_4: 'text',
      LOV_ALIAS_VALUE_4: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_1").getValue()), 'm/d/Y'),
      LOV_ALIAS_NAME_5: "enddate",
      LOV_ALIAS_TYPE_5: 'text',
      LOV_ALIAS_VALUE_5: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y'),
      LOV_ALIAS_NAME_6: "dataspy",
      LOV_ALIAS_TYPE_6: 'text',
      LOV_ALIAS_VALUE_6: '1'
    }
  });
  if (EAM.Utils.propertyExists(vGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vListOfData = vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA
        vListOfData.forEach(function (rec) {
          var _go = true
            var dStart = new Date(EAM.Utils.dateDTypeConvert(rec.start_date, EAM.AppData.getAppData().dateformat)),
          dEnd = new Date(EAM.Utils.dateDTypeConvert(rec.end_date, EAM.AppData.getAppData().dateformat))
            var dNewStart = new Date(Ext.getCmp("cust_date_deb_1").getValue())
            var dNewEnd = new Date(Ext.getCmp("cust_date_deb_2").getValue())
            /* Case 1
            si ddnl > ddle et dfle > ddnl et
             */
            if ((((dNewStart.getTime() - dStart.getTime()) > 0 && (dEnd.getTime() - dNewStart.getTime()) > 0 && (dNewEnd.getTime() - dEnd.getTime()) > 0)
                /*||((dNewStart.getTime()-dStart.getTime())>0&&(dEnd.getTime()-dNewEnd.getTime())==0)*/
              ) && _go) {
              console.log("cas 1")
              _go = false;
              var dNewEnd2 = new Date(dNewStart)
                dNewEnd2.setDate(dNewEnd2.getDate() - 1)

                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_line: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPDP"
                vRecordToUpdate["wspf_10_end_date"] = Ext.Date.format(dNewEnd2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });

            }
            /* Cas 2*/
            if ((((dNewStart.getTime() - dStart.getTime()) < 0 && (dEnd.getTime() - dNewEnd.getTime()) == 0)) && _go) {
              console.log("cas 2")
              _go = false;
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "BSDEPT",
                  USER_FUNCTION_NAME: "BSDEPT",
                  CURRENT_TAB_NAME: "U1",
                  wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_line: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPDP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });
            }
            /* Cas 2.1*/
            if ((((dNewStart.getTime() - dStart.getTime()) < 0 && (dEnd.getTime() - dNewEnd.getTime()) < 0)) && _go) {
              console.log("cas 2.1")
              _go = false;
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "BSDEPT",
                  USER_FUNCTION_NAME: "BSDEPT",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_line: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPDP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });
            }
            /* Cas 3*/
            if ((((dStart.getTime() - dNewStart.getTime()) > 0 && (dNewEnd.getTime() - dStart.getTime()) > 0 && (dEnd.getTime() - dNewEnd.getTime()) > 0) ||
                ((dStart.getTime() - dNewStart.getTime()) > 0 && (dStart.getTime() - dNewEnd.getTime()) == 0)) && _go) {
              _go = false;
              console.log("cas 3")
              var dNewStart2 = new Date(dNewEnd)
                dNewStart2.setDate(dNewStart2.getDate() + 1)

                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_line: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPDP"
                vRecordToUpdate["wspf_10_start_date"] = Ext.Date.format(dNewStart2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });
            }
            /*Cas 4*/
            if ((((dStart.getTime() - dNewStart.getTime()) < 0 && (dEnd.getTime() - dNewEnd.getTime()) == 0)) && _go) {
              /*||((dNewStart.getTime()-dStart.getTime())>0&&(dEnd.getTime()-dNewEnd.getTime())==0)*/
              _go = false;
              console.log("cas 4")
              var dNewEnd2 = new Date(dNewStart)
                dNewEnd2.setDate(dNewEnd2.getDate() - 1)

                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_line: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPDP"
                vRecordToUpdate["wspf_10_end_date"] = Ext.Date.format(dNewEnd2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });
            }
            /* Cas 5*/
            if ((((dStart.getTime() - dNewStart.getTime()) == 0 && (dEnd.getTime() - dNewEnd.getTime()) < 0)) && _go) {
              _go = false;
              console.log("cas 5")
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "BSDEPT",
                  USER_FUNCTION_NAME: "BSDEPT",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_line: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPDP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });
            }
            /*Cas 6 */
            if ((((dStart.getTime() - dNewStart.getTime()) < 0 && (dEnd.getTime() - dNewEnd.getTime()) > 0)) && _go) {
              _go = false;
              console.log("cas 6")
              var dNewEnd2 = new Date(dNewStart)
                dNewEnd2.setDate(dNewEnd2.getDate() - 1)
                var dNewStart2 = new Date(dNewEnd)
                dNewStart2.setDate(dNewStart2.getDate() + 1)
                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_line: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPDP"
                vRecordToUpdate["wspf_10_end_date"] = Ext.Date.format(dNewEnd2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });

              newLine = newLine + 1;

              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "BSDEPT",
                  USER_FUNCTION_NAME: "BSDEPT",
                  CURRENT_TAB_NAME: "U2",
                  departmentcode: Ext.getCmp("cust_supplier").getValue(),
                  departmentorganization: Ext.getCmp("cust_supplier_org").getValue()
                }
              }).responseData.pageData.values;

              vRecord["can_delete"] = true
                vRecord["can_insert"] = true
                vRecord["can_update"] = true
                vRecord["cfgrouplist"] = null
                vRecord["pagemode"] = "display"
                vRecord["processaction"] = "insert"
                vRecord["recordid"] = null
                vRecord["wspf_10_service"] = null
                vRecord["webservicepromptcode"] = "BUCPDP"
                vRecord["wspf_10_avail_day"] = vRecordToUpdate["wspf_10_avail_day"]
                vRecord["wspf_10_dataspy"] = "1"
                vRecord["wspf_10_end_date"] = Ext.Date.format(new Date(dEnd), 'm/d/Y')
                vRecord["wspf_10_line"] = newLine
                vRecord["wspf_10_reuse_period"] = vRecordToUpdate["wspf_10_reuse_period"]

                vRecord["wspf_10_start_date"] = Ext.Date.format(new Date(dNewStart2), 'm/d/Y')
                vRecord["wspf_10_mrc"] = Ext.getCmp("cust_supplier").getValue()
                vRecord["wspf_10_mrc_org"] = Ext.getCmp("cust_supplier_org").getValue()
                vRecord["wspf_10_trade"] = '*'
                vRecord["wsptab"] = "U2"
                vRecord["PKID"] = Ext.getCmp("cust_supplier").getValue() + '#' + Ext.getCmp("cust_supplier_org").getValue() + '#' + newLine
                vRecord["mrc"] = Ext.getCmp("cust_supplier").getValue()
                vRecord["mrc_org"] = Ext.getCmp("cust_supplier_org").getValue()

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.insertrecord?pageaction=SAVE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });

            }
            /*Cas 7 */
            if (((dNewStart.getTime() - dNewEnd.getTime()) == 0 && (dNewStart.getTime() - dStart.getTime()) == 0) && _go) {
              console.log("cas 7")
              _go = false;

              var dNewStart2 = new Date(dStart)
                dNewStart2.setDate(dNewStart2.getDate() + 1)
                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_line: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPDP"
                vRecordToUpdate["wspf_10_start_date"] = Ext.Date.format(dNewStart2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });

              newLine = newLine + 1;

            }

            /*Cas 8 */
            if (((dNewStart.getTime() - dNewEnd.getTime()) == 0 && (dNewEnd.getTime() - dEnd.getTime()) == 0) && _go) {
              console.log("cas 8")
              _go = false;

              var dNewStart2 = new Date(dNewEnd)
                dNewStart2.setDate(dNewStart2.getDate() - 1)
                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_line: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPDP"
                vRecordToUpdate["wspf_10_end_date"] = Ext.Date.format(dNewStart2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });

              newLine = newLine + 1;

            }

            /*Cas 9 */
            if (((dNewStart.getTime() - dStart.getTime()) == 0 && (dNewEnd.getTime() - dEnd.getTime()) < 0) && _go) {
              console.log("cas 9")
              _go = false;
              var dNewStart2 = new Date(dNewEnd)
                dNewStart2.setDate(dNewStart2.getDate() + 1)

                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_line: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPDP"
                vRecordToUpdate["wspf_10_start_date"] = Ext.Date.format(dNewStart2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });

              newLine = newLine + 1;

            }
            /*Cas 10 */
            if (((dNewStart.getTime() - dStart.getTime()) == 0 && (dNewStart.getTime() - dEnd.getTime()) == 0) && _go) {
              console.log("cas 10")
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "BSDEPT",
                  USER_FUNCTION_NAME: "BSDEPT",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_line: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPDP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });

            }
            /*Cas 11 */
            if (((dNewEnd.getTime() - dStart.getTime()) == 0 && (dNewEnd.getTime() - dEnd.getTime()) == 0) && _go) {
              console.log("cas 11")
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "BSDEPT",
                  USER_FUNCTION_NAME: "BSDEPT",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_line: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPDP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "BSDEPT",
                    USER_FUNCTION_NAME: "BSDEPT",
                    can_update: "true",
                  })
                });

            }

        })
    }
  }

}
function adjust_department_capacity(a, b, c, d, e, vBoilerList) {
  var vDepartmentCode = a,
  vDepartmentOrg = b,
  vSupplierDesc = c,
  vTradeCode = '*',
  vTradeDesc = e;

  var vYear1 = parseInt(Ext.Date.format(new Date(), 'Y'));
  var vYear2 = parseInt(Ext.Date.format(new Date(), 'Y')) + 1;
  var vDateYear1 = Ext.Date.format(new Date(vYear1, 0, 1), 'm/d/Y')
    var vDateYear2 = Ext.Date.format(new Date(vYear2, 11, 31), 'm/d/Y')
    var vDataspy = '1';
  var vDataspyDesc = Ext.getCmp("filter").rawValue;
  var vLastRow = 0;
  if (Ext.getStore("cust_temp_screendata")) {
    Ext.getStore("cust_temp_screendata").destroy();
  }

  var vCust_temp_screendata = Ext.create('Ext.data.Store', {
    id: 'cust_temp_screendata',
    fields: [],
    data: []
  })
    var vInfoTab = EAM.Ajax.request({
      url: "BSUDSC.TAB",
      params: {
        SYSTEM_FUNCTION_NAME: "BSDEPT",
        USER_FUNCTION_NAME: "BSDEPT",
        CURRENT_TAB_NAME: "U2",
        departmentcode: vDepartmentCode,
        departmentorganization: vDepartmentOrg
      },
      messagingOptions: {
        deferConfirm: !0,
        deferWarning: !0,
        deferError: !0
      }
    });
  if (vInfoTab && EAM.Utils.propertyExists(vInfoTab, 'responseData.pageData')) {
    Ext.getStore("cust_temp_screendata").responseData = vInfoTab.responseData
  }
  var vGrid = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      GRID_NAME: "XUSUPC",
      GRID_TYPE: "LOV",
      REQUEST_TYPE: "LOV.HEAD_DATA.STORED",
      usagetype: "lov",
      LOV_ALIAS_NAME_1: "suppliercode",
      LOV_ALIAS_TYPE_1: "text",
      LOV_ALIAS_VALUE_1: vDepartmentCode,
      LOV_ALIAS_NAME_2: "supplierorg",
      LOV_ALIAS_TYPE_2: "text",
      LOV_ALIAS_VALUE_2: vDepartmentOrg,
      LOV_ALIAS_NAME_3: "trade",
      LOV_ALIAS_TYPE_3: 'text',
      LOV_ALIAS_VALUE_3: vTradeCode,
      LOV_ALIAS_NAME_4: "startdate",
      LOV_ALIAS_TYPE_4: 'text',
      LOV_ALIAS_VALUE_4: vDateYear1,
      LOV_ALIAS_NAME_5: "enddate",
      LOV_ALIAS_TYPE_5: 'text',
      LOV_ALIAS_VALUE_5: vDateYear2,
      LOV_ALIAS_NAME_6: "dataspy",
      LOV_ALIAS_TYPE_6: 'text',
      LOV_ALIAS_VALUE_6: vDataspy
    }
  });
  if (EAM.Utils.propertyExists(vGrid, "responseData.pageData.grid.GRIDRESULT.GRID.DATA")) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      vLastRow = parseInt(vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA[0].last_row)
    }
  }
  if (Ext.getCmp("cust_Grid_SupplierCapacity")) {
    Ext.getCmp("cust_Grid_SupplierCapacity").destroy();
  }
  if (Ext.getCmp("cust_Grid_ListOfSupplierCapacity")) {
    Ext.getCmp("cust_Grid_ListOfSupplierCapacity").destroy();
  }
  var vFields = []
  var vPrefactStore = Ext.create('Ext.data.Store', {
    id: 'cust_Grid_SupplierCapacity',
    fields: vFields,
    autoLoad: true,
    autoSync: true,
    pageSize: 200,
    listeners: {
      sort: function (a, b) {
        console.log("sortstore");
        var v = Ext.getStore('cust_Grid_SupplierCapacity')
          if (v) {
            v.proxy.data = [];
            for (i = 0; i < v.data.items.length; i++) {
              v.proxy.data.push(v.data.items[i].data)
            }
          }
      },
      storechange: function (a, c, d, e) {
        console.log("storechange")
      },
      change: function (a, c, d, e) {
        console.log("storechange2")
      }
    },
    proxy: {
      type: 'memory',
      enablePaging: true,
      reader: {
        type: 'json',
        rootProperty: 'data',
        totalProperty: 'total'
      }
    }
  });

  Ext.getStore("cust_Grid_SupplierCapacity").flushLoad()
  Ext.getStore("cust_Grid_SupplierCapacity").removeAll()
  var vModeRecortPresent = '-'
    var vCURRENTCURSORPOSITION = 0;
  if (!Ext.isEmpty(vGrid) && EAM.Utils.propertyExists(vGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vG = vGrid.responseData.pageData.grid.GRIDRESULT.GRID
        vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
        vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_SupplierCapacity').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
        Ext.getStore('cust_Grid_SupplierCapacity').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_SupplierCapacity').gridMetaData = vG.METADATA

        vG.DATA.forEach(function (rec) {
          vReuseChk = false;
          if (rec.reuse_period == "+") {
            vReuseChk = true;
          } else {
            vReuseChk = false;
          }

          Ext.getStore('cust_Grid_SupplierCapacity').add(new Ext.data.Record({
              row_id: rec.id,
              dataspy: rec.dataspy,
              ligne: rec.ligne,
              reuse_period: vReuseChk,
              supplier_code: rec.supplier_code,
              trade: rec.trade,
              start_date: new Date(EAM.Utils.dateDTypeConvert(rec.start_date, EAM.AppData.getAppData().dateformat)),
              end_date: new Date(EAM.Utils.dateDTypeConvert(rec.end_date, EAM.AppData.getAppData().dateformat)),
              avail_day: rec.avail_day,
              supplier_org: rec.supplier_org

            }));
        })

    }
    Ext.getStore('cust_Grid_SupplierCapacity').totalCount = vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
  }
  if (Ext.getCmp("gantt.adj_dataspy.store")) {
    Ext.getCmp("gantt.adj_dataspy.store").destroy();
  }
  if (Ext.getCmp("gantt.adj_supplier.store")) {
    Ext.getCmp("gantt.adj_supplier.store").destroy();
  }
  if (Ext.getCmp("gantt.adj_trade.store")) {
    Ext.getCmp("gantt.adj_trade.store").destroy();
  }
  var vDataspyStoreCust = Ext.create('Ext.data.Store', {
    id: 'gantt.adj_dataspy.store',
    fields: ['code', 'description'],
    data: [{
        "code": vDataspy,
        "description": vDataspyDesc
      }
    ]
  });

  var vSupplierStore = Ext.create('Ext.data.Store', {
    id: 'gantt.adj_supplier.store',
    fields: ['code', 'description'],
    data: [{
        "code": vDepartmentCode,
        "description": ""
      }
    ]
  });
  var vTradeStore = Ext.create('Ext.data.Store', {
    id: 'gantt.adj_trade.store',
    fields: ['code', 'description'],
    data: [{
        "code": vTradeCode,
        "description": vTradeDesc
      }
    ]
  });

  var panel = new Ext.Panel({
    title: gantt.locale.labels.adj_capac_formtitle,
    frame: true,
    width: 1500,
    id: 'CustomPanel',
    height: 800,
    modal: true,
    closable: true,
    centered: true,
    floating: true,
    closable: false,
    resizable: true,
    layout: 'vbox',
    draggable: true,
    margins: '5 5 5 5',
    layoutConfig: {
      animate: true
    },
    items: [{
        //title: 'Filtre',
        id: "cust_panel_3",
        region: 'north',
        xtype: 'panel',
        split: true,
        collapsible: false,
        width: '100%',
        height: '20%',
        layout: 'column',
        defaults: {
          //columnWidth: 0.33
        },
        items: [{
            id: "cust_panel_1_sub_1",
            scrollable: true,
            //region: 'north',   // position for region
            xtype: 'panel',
            height: "50%",
            width: '100%',
            layout: 'column',
            split: true, // enable resizing
            margin: '0 5 5 5',
            items: [{
                name: 'cust_supplier',
                id: "cust_supplier",
                xtype: 'textfield',
                colspan: 1,
                rowspan: 1,
                fieldLabel: vBoilerList["adjust_dep_capa_dept"],
                maxLength: 15,
                value: vDepartmentCode,
                upper: !0,
                hidden: false,
                padding: "10px",
                readOnly: !0,
                readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
              }, {
                name: 'cust_supplier_org',
                id: "cust_supplier_org",
                xtype: 'textfield',
                colspan: 1,
                rowspan: 1,
                fieldLabel: vBoilerList["adjust_dep_capa_dept_org"],
                maxLength: 15,
                value: vDepartmentOrg,
                upper: !0,
                hidden: false,
                padding: "10px",
                readOnly: !0,
                readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
              }

            ]
          }, {
            id: "cust_panel_1_sub_2",
            scrollable: true,
            //region: 'north',   // position for region
            xtype: 'panel',
            height: "50%",
            width: '100%',
            layout: 'column',
            defaults: {
              //columnWidth: 0.333
            },
            tools: [{
                iconCls: 'toolbarReset',
                tooltip: vBoilerList["adj_capac_tooltip_refresh"],
                // left: "50%",
                callback: function () {
                  cust_capacity_refreshGrid();

                }
              }
            ],
            split: true, // enable resizing
            margin: '0 5 5 5',
            items: [{
                name: 'cust_from_year',
                id: "cust_from_year",
                vtype: "integer",
                numberFormat: "4,0",
                xtype: 'uxnumber',
                colspan: 1,
                rowspan: 1,
                fieldLabel: vBoilerList["adj_capac_fromyear"],
                maxLength: 15,
                value: vYear1,
                upper: !0,
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field'
              }, {
                name: 'cust_to_year',
                id: "cust_to_year",
                xtype: 'uxnumber',
                vtype: "integer",
                numberFormat: "4,0",
                colspan: 1,
                rowspan: 1,
                fieldLabel: vBoilerList["adj_capac_toyear"],
                maxLength: 15,
                value: vYear2,
                upper: !0,
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field'
              }
            ]
          }

        ]
      }, {
        //title: 'Filtre',
        id: "cust_panel_1",
        region: 'center',
        xtype: 'panel',
        split: true,
        //collapsible: false,
        //scrollable:true,
        layout: "fit",
        width: '100%',
        height: '60%',
        padding: '10px'
      }, {
        //title: 'Filtre',
        id: "cust_panel_2",
        split: true,
        xtype: 'panel',
        layout: 'column',
        defaults: {
          columnWidth: 0.5
        },
        width: '100%',
        //layout : 'fit',
        collapsible: false,
        region: 'center',
        tools: [{

            iconCls: 'toolbarSave',
            tooltip: vBoilerList["adj_capac_tooltip_save"],
            style: {
              left: "0px"
            },
            docked: 'left',
            callback: function (a, b, c, d) {
              // show help here
              var newLine = -1;

              var dStart = new Date(Ext.getCmp("cust_date_deb_1").getValue())
                var dEnd = new Date(Ext.getCmp("cust_date_deb_2").getValue())
                var nValue = parseFloat(Ext.getCmp("avail_qty_fld1").getValue())
                var bTest = true;
              if ((dEnd - dStart) < 0) {
                Ext.getCmp("cust_date_deb_2").markInvalid(vBoilerList["adj_date_greater"])
                bTest = false;
              }
              if (Ext.getCmp("cust_date_deb_1").getValue() == "") {
                Ext.getCmp("cust_date_deb_1").markInvalid(vBoilerList["adj_required_field"])
                bTest = false;
              }
              if (Ext.getCmp("cust_date_deb_2").getValue() == "") {
                Ext.getCmp("cust_date_deb_2").markInvalid(vBoilerList["adj_required_field"])
                bTest = false;
              }
              if (nValue <= 0 || isNaN(nValue) || nValue == null || nValue == "") {
                Ext.getCmp("avail_qty_fld1").markInvalid(vBoilerList["adj_value_greater_than0"])
                bTest = false;
              }
              if (!bTest) {
                return false;
              }
              if (gantt.config.capacity_mode == "display") {
                var vReusePeriod = "0"
                  if (Ext.getCmp("reuse_period_fld1").getValue()) {
                    vReusePeriod = "-1"
                  } else {
                    vReusePeriod = "0"
                  }
                  var vGrid = EAM.Ajax.request({
                    url: "BSUDSC.TAB.xmlhttp",
                    params: {
                      GRID_NAME: "BSDEPT_U2",
                      USER_FUNCTION_NAME: "BSDEPT",
                      SYSTEM_FUNCTION_NAME: "BSDEPT",
                      CURRENT_TAB_NAME: "U2",
                      COMPONENT_INFO_TYPE: "DATA_ONLY",
                      departmentcode: Ext.getCmp("cust_supplier").getValue(),
                      departmentorganization: Ext.getCmp("cust_supplier_org").getValue(),
                      MADDON_FILTER_ALIAS_NAME_1: "wspf_10_mrc",
                      MADDON_FILTER_OPERATOR_1: "=",
                      MADDON_FILTER_JOINER_1: "AND",
                      MADDON_FILTER_SEQNUM_1: 1,
                      MADDON_FILTER_VALUE_1: Ext.getCmp("cust_supplier").getValue(),
                      MADDON_LPAREN_1: false,
                      MADDON_RPAREN_1: false,
                      MADDON_FILTER_ALIAS_NAME_2: "wspf_10_mrc_org",
                      MADDON_FILTER_OPERATOR_2: "=",
                      MADDON_FILTER_JOINER_2: "AND",
                      MADDON_FILTER_SEQNUM_2: 2,
                      MADDON_FILTER_VALUE_2: Ext.getCmp("cust_supplier_org").getValue(),
                      MADDON_LPAREN_2: false,
                      MADDON_RPAREN_2: false,
                      MADDON_FILTER_ALIAS_NAME_3: "wspf_10_trade",
                      MADDON_FILTER_OPERATOR_3: "=",
                      MADDON_FILTER_JOINER_3: "AND",
                      MADDON_FILTER_SEQNUM_3: 3,
                      MADDON_FILTER_VALUE_3: "*",
                      MADDON_LPAREN_3: false,
                      MADDON_RPAREN_3: false,
                      MADDON_FILTER_ALIAS_NAME_4: "wspf_10_start_date",
                      MADDON_FILTER_OPERATOR_4: "=",
                      MADDON_FILTER_JOINER_4: "AND",
                      MADDON_FILTER_SEQNUM_4: 4,
                      MADDON_FILTER_VALUE_4: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_1").getValue()), 'm/d/Y'),
                      MADDON_LPAREN_4: false,
                      MADDON_RPAREN_4: false,
                      MADDON_FILTER_ALIAS_NAME_5: "wspf_10_end_date",
                      MADDON_FILTER_OPERATOR_5: "=",
                      MADDON_FILTER_JOINER_5: "AND",
                      MADDON_FILTER_SEQNUM_5: 5,
                      MADDON_FILTER_VALUE_5: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y'),
                      MADDON_LPAREN_5: false,
                      MADDON_RPAREN_5: false,
                      MADDON_FILTER_ALIAS_NAME_6: "wspf_10_reuse_period",
                      MADDON_FILTER_OPERATOR_6: "=",
                      MADDON_FILTER_JOINER_6: "AND",
                      MADDON_FILTER_SEQNUM_6: 6,
                      MADDON_FILTER_VALUE_6: vReusePeriod,
                      MADDON_LPAREN_6: false,
                      MADDON_RPAREN_6: false,
                      MADDON_FILTER_ALIAS_NAME_7: "wspf_10_dataspy",
                      MADDON_FILTER_OPERATOR_7: "=",
                      MADDON_FILTER_JOINER_7: "AND",
                      MADDON_FILTER_SEQNUM_7: 7,
                      MADDON_FILTER_VALUE_7: "1",
                      MADDON_LPAREN_7: false,
                      MADDON_RPAREN_7: false,
                    }
                  });
                if (EAM.Utils.propertyExists(vGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
                  if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
                    EAM.Messaging.showError(vBoilerList["adj_duplicate_record"]);
                    return false;
                  }
                }
              }
              if (gantt.config.capacity_mode == "display") {
                if (Ext.getCmp("cust_date_deb_1").getValue().toString() != "" &&
                  Ext.getCmp("cust_date_deb_2").getValue().toString() != "" &&
                  Ext.getCmp("avail_qty_fld1").getValue().toString() != "")

                  var vRecord = EAM.Ajax.request({
                    url: "BSUDSC.TAB",
                    params: {
                      SYSTEM_FUNCTION_NAME: "BSDEPT",
                      USER_FUNCTION_NAME: "BSDEPT",
                      CURRENT_TAB_NAME: "U2",
                      departmentcode: Ext.getCmp("cust_supplier").getValue(),
                      departmentorganization: Ext.getCmp("cust_supplier_org").getValue(),
                    }
                  }).responseData.pageData.values;

                vRecord["can_delete"] = true
                  vRecord["can_insert"] = true
                  vRecord["can_update"] = true
                  vRecord["cfgrouplist"] = null
                  vRecord["pagemode"] = "display"
                  vRecord["processaction"] = "insert"
                  vRecord["recordid"] = null
                  vRecord["wspf_10_service"] = null
                  vRecord["webservicepromptcode"] = "BUCPDP"
                  vRecord["wspf_10_avail_day"] = parseFloat(Ext.getCmp("avail_qty_fld1").getValue())
                  vRecord["wspf_10_dataspy"] = "1"
                  vRecord["wspf_10_end_date"] = Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y')
                  vRecord["wspf_10_line"] = newLine
                  if (Ext.getCmp("reuse_period_fld1").getValue()) {
                    vRecord["wspf_10_reuse_period"] = "-1"
                  } else {
                    vRecord["wspf_10_reuse_period"] = "0"
                  }
                  vRecord["wspf_10_start_date"] = Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_1").getValue()), 'm/d/Y')
                  vRecord["wspf_10_mrc"] = Ext.getCmp("cust_supplier").getValue()
                  vRecord["wspf_10_mrc_org"] = Ext.getCmp("cust_supplier_org").getValue()
                  vRecord["wspf_10_trade"] = "*"
                  vRecord["wsptab"] = "U1"
                  vRecord["PKID"] = Ext.getCmp("cust_supplier").getValue() + '#' + Ext.getCmp("cust_supplier_org").getValue() + '#' + newLine
                  vRecord["department"] = Ext.getCmp("cust_supplier").getValue()
                  vRecord["departmentorganization"] = Ext.getCmp("cust_supplier_org").getValue()

                  var vStatus = EAM.Ajax.request({
                    url: "BSUDSC.TAB.insertrecord?pageaction=SAVE",
                    params: Ext.merge(vRecord, {
                      CHECK_CF_CHANGEFLAG: "true",
                      CURRENT_TAB_NAME: "U2",
                      SYSTEM_FUNCTION_NAME: "BSDEPT",
                      USER_FUNCTION_NAME: "BSDEPT",
                      can_update: "true",
                    })
                  });
                if (vStatus) {
                  /*On recherche les lignes ayant des dates en conflits*/
                  adjust_existing_dep_capacity(newLine);

                  cust_capacity_refreshGrid();
                }

              }

              if (gantt.config.capacity_mode == "view") {
                if (new Date(gantt.config.capacity_old_date_deb_1).toString() != new Date(Ext.getCmp("cust_date_deb_1").getValue()).toString() ||
                  new Date(gantt.config.capacity_old_date_deb_2).toString() != new Date(Ext.getCmp("cust_date_deb_2").getValue()).toString() ||
                  gantt.config.capacity_old_reuse_period_fld1 != Ext.getCmp("reuse_period_fld1").getValue() ||
                  parseFloat(gantt.config.capacity_old_avail_qty_fld1) != parseFloat(Ext.getCmp("avail_qty_fld1").getValue())) {

                  var vRecord = EAM.Ajax.request({
                    url: "BSUDSC.TAB",
                    params: {
                      SYSTEM_FUNCTION_NAME: "BSDEPT",
                      USER_FUNCTION_NAME: "BSDEPT",
                      CURRENT_TAB_NAME: "U2",
                      wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                      wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                      wspf_10_ligne: Ext.getCmp("cust_line").getValue(),
                      pagemode: "view",
                      processaction: "get",
                      REFRESH_GRID: false,
                      ONLY_DATA_REQUIRED: true
                    }
                  }).responseData.pageData.values;
                  vRecord["webservicepromptcode"] = "BUCPDP"
                    vRecord["wspf_10_start_date"] = Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_1").getValue()), 'm/d/Y')
                    vRecord["wspf_10_end_date"] = Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y')
                    vRecord["wspf_10_avail_day"] = parseFloat(Ext.getCmp("avail_qty_fld1").getValue())
                    vRecord["processaction"] = "sync"
                    vRecord["pagemode"] = "view"
                    if (Ext.getCmp("reuse_period_fld1").getValue()) {
                      vRecord["wspf_10_reuse_period"] = "-1"
                    } else {
                      vRecord["wspf_10_reuse_period"] = "0"
                    }

                    var vStatus = EAM.Ajax.request({
                      url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                      params: Ext.merge(vRecord, {
                        CHECK_CF_CHANGEFLAG: "true",
                        CURRENT_TAB_NAME: "U2",
                        SYSTEM_FUNCTION_NAME: "BSDEPT",
                        USER_FUNCTION_NAME: "BSDEPT",
                        can_update: "true",
                      })
                    });
                  if (vStatus) {
                    adjust_existing_dep_capacity(newLine);
                    cust_capacity_refreshGrid();
                  }
                }
              }

            }
          }, {
            iconCls: 'toolbarNew',
            tooltip: gantt.locale.labels.adj_capac_tooltip_newrec,
            left: "70%",
            align: 'left',
            callback: function () {
              // show help here
              Ext.getCmp("cust_date_deb_1").setValue("")

              Ext.getCmp("cust_date_deb_2").setValue("")

              Ext.getCmp("avail_qty_fld1").setValue("")
              Ext.getCmp("cust_date_deb_1").setReadOnly(false)
              Ext.getCmp("cust_date_deb_2").setReadOnly(false)
              Ext.getCmp("reuse_period_fld1").setReadOnly(false)
              gantt.config.capacity_mode = "display";
            }
          }, {
            iconCls: 'toolbarDelete',
            tooltip: gantt.locale.labels.adj_capac_tooltip_delete,
            //left: "40%",
            align: 'left',
            callback: function () {
              if (gantt.config.capacity_mode == "view") { {

                  var vRecord = EAM.Ajax.request({
                    url: "BSUDSC.TAB",
                    params: {
                      SYSTEM_FUNCTION_NAME: "BSDEPT",
                      USER_FUNCTION_NAME: "BSDEPT",
                      CURRENT_TAB_NAME: "U2",
                      wspf_10_mrc: Ext.getCmp("cust_supplier").getValue(),
                      wspf_10_mrc_org: Ext.getCmp("cust_supplier_org").getValue(),
                      wspf_10_line: Ext.getCmp("cust_line").getValue(),
                      pagemode: "view",
                      processaction: "get",
                      REFRESH_GRID: false,
                      ONLY_DATA_REQUIRED: true
                    }
                  }).responseData.pageData.values;
                  vRecord["webservicepromptcode"] = "BUCPDP"
                    vRecord["processaction"] = "delete"
                    vRecord["pagemode"] = "view"

                    var vStatus = EAM.Ajax.request({
                      url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                      params: Ext.merge(vRecord, {
                        CHECK_CF_CHANGEFLAG: "true",
                        CURRENT_TAB_NAME: "U2",
                        SYSTEM_FUNCTION_NAME: "BSDEPT",
                        USER_FUNCTION_NAME: "BSDEPT",
                        can_update: "true",
                      })
                    });
                  if (vStatus) {
                    cust_capacity_refreshGrid();
                    Ext.getCmp("cust_date_deb_1").setValue("")
                    Ext.getCmp("cust_date_deb_2").setValue("")
                    Ext.getCmp("avail_qty_fld1").setValue("")
                    Ext.getCmp("cust_date_deb_1").setReadOnly(false)
                    Ext.getCmp("cust_date_deb_2").setReadOnly(false)
                    Ext.getCmp("reuse_period_fld1").setReadOnly(false)
                    gantt.config.capacity_mode = "display";
                  }
                }

              }
            }
          }
        ],
        items: [{
            //title: 'Filtre',
            id: "cust_panel_2_sub_1",
            scrollable: true,
            region: 'west', // position for region
            xtype: 'panel',
            height: "100%",
            width: '50%',
            split: true, // enable resizing
            margin: '0 5 5 5',
            items: [{
                xtype: 'uxdate',
                anchor: '100%',
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_start_date.label,
                //fieldLabel: 'From',
                id: 'cust_date_deb_1',
                value: new Date(),
                //format: "d/m/y",
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                listeners: {
                  change: function (a, b, c) {
                    /*if(b===null){
                    Ext.getCmp("cust_date_deb_2").setValue("")
                    }
                    if(b>Ext.getCmp("cust_date_deb_2").getValue()){
                    Ext.getCmp("cust_date_deb_2").setValue("")
                    }*/
                  }
                }
              }, {
                xtype: 'uxnumber',
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_avail_day.label,
                id: 'avail_qty_fld1',
                vtype: "currency",
                numberFormat: "24,6",
                value: 0,
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                padding: "10px"
              }
            ]
          }, {
            //title: 'Filtre',
            id: "cust_panel_2_sub_2",
            region: 'center',
            xtype: 'panel',
            //split:true,
            //collapsible: false,
            //width :'50%',
            height: '100%',
            items: [{
                xtype: 'uxdate',
                anchor: '100%',
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_end_date.label,
                //fieldLabel: 'From',
                id: 'cust_date_deb_2',
                value: new Date(),
                //format: "d/m/y",
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                listeners: {
                  change: function (a, b, c) {
                    /*if(b===null){
                    //Ext.getCmp("cust_date_deb_2").setValue("")
                    }
                    if(b<Ext.getCmp("cust_date_deb_1").getValue()){
                    Ext.getCmp("cust_date_deb_1").setValue("")
                    }*/
                  }
                }
              }, {
                xtype: 'checkbox',
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_reuse_period.label,
                id: 'reuse_period_fld1',
                value: 0,
                padding: "10px"
              }, {
                name: 'cust_line',
                id: "cust_line",
                xtype: 'textfield',
                colspan: 1,
                hidden: true,
                rowspan: 1,
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_line.label,
                maxLength: 15,
                value: "",
                upper: !0,
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field'

              }
            ]
          }

        ],
      }
    ],
    buttonAlign: 'center',
    buttons: [{
        text: gantt.locale.labels.adj_capac_close,
        margin: '0 0 0 5',
        handler: function () {
          panel.close();
        },
        ui: 'popupfooter'
      }
    ]
  });

  var vGridPresta = Ext.create('Ext.grid.Panel', {
    id: "cust_Grid_ListOfSupplierCapacity",
    xtype: 'editablegrid',
    cust_object: 'shutdown_planning',
    // plugins: [cellEditing]  ,
    store: Ext.getStore('cust_Grid_SupplierCapacity'), //Ext.data.StoreManager.lookup('cust.prefact.values'),
    autoWidth: false,
    titleBar: {
      hidden: true
    },
    header: false,
    //autoHeight:false,
    //height:some-height,
    editable: !1,
    //pluginType: 'EAM.ux.grid.plugin.CellEditing',
    multiSelect: false,
    multiColumnSort: true,
    scrollable: true,
    viewConfig: {
      preserveScrollOnRefresh: false
    },
    dockedItems: [],
    columns: [{
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_mrc.label,
        dataIndex: 'supplier_code',
        flex: 15 / 100,
        hidden: true

      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_trade.label,
        dataIndex: 'trade',
        flex: 30 / 100,
        hidden: true
      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_start_date.label,
        dataIndex: 'start_date',
        xtype: 'uxdatecolumn',
        renderer: function (value, metaData, record) {
          return Ext.Date.format(new Date(value), EAM.AppData.getAppData().dateformat)

        },
        flex: 30 / 100
      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_end_date.label,
        dataIndex: 'end_date',
        xtype: 'uxdatecolumn',
        renderer: function (value, metaData, record) {
          return Ext.Date.format(new Date(value), EAM.AppData.getAppData().dateformat)

        },
        flex: 30 / 100
      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_avail_day.label,
        dataIndex: 'avail_day',
        flex: 15 / 100,
        renderer: function (value, metaData, record) {
          if (parseFloat(value) != parseInt(value)) {
            return parseFloat(value).toFixed(2)

          } else {
            return parseInt(value)
          }

        }
      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_dataspy.label,
        dataIndex: 'dataspy',
        flex: 15 / 100,
        hidden: true,
        renderer: function (value, metaData, record) {
          if (parseFloat(value) != parseInt(value)) {
            return parseFloat(value).toFixed(2)

          } else {
            return parseInt(value)
          }

        }
      }, {
        header: 'Ligne',
        dataIndex: 'ligne',
        flex: 15 / 100,
        hidden: true
      }, {
        xtype: 'uxcheckcolumn',
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_reuse_period.label,
        dataIndex: 'reuse_period',
        flex: 15 / 100

      }
    ],
    height: "100%",
    width: "100%",
    listeners: {

      viewready: function (grid, eOpts) {
        console.log("viewready");
        grid.view.getEl().on('scroll', function (a, b, c) {})
      },

      cellclick: function (g, rowIndex, colIndex, e) {
        Ext.getCmp("cust_date_deb_1").setRawValue(new Date(e.data.start_date))
        Ext.getCmp("cust_date_deb_1").setReadOnly(true)
        Ext.getCmp("cust_date_deb_1").setValue(new Date(e.data.start_date))
        gantt.config.capacity_old_date_deb_1 = new Date(e.data.start_date)
          Ext.getCmp("cust_date_deb_2").setRawValue(new Date(e.data.end_date))
          Ext.getCmp("cust_date_deb_2").setValue(new Date(e.data.end_date))
          Ext.getCmp("cust_date_deb_2").setReadOnly(true)
          gantt.config.capacity_old_date_deb_2 = new Date(e.data.end_date)
          Ext.getCmp("cust_line").setValue(e.data.ligne)
          Ext.getCmp("reuse_period_fld1").setValue(e.data.reuse_period)
          Ext.getCmp("reuse_period_fld1").setReadOnly(true)
          gantt.config.capacity_old_reuse_period_fld1 = e.data.reuse_period

          Ext.getCmp("avail_qty_fld1").setValue(e.data.avail_day)

          gantt.config.capacity_old_avail_qty_fld1 = e.data.avail_day

          gantt.config.capacity_mode = "view";

      },
      celldblclick: function (g, rowIndex, colIndex, e) {
        console.log(colIndex);
      },
      storechange: function (sender, value, oldValue, eOpts) {
        console.log("storechange");
      },
      selectionchange: function (a, b, c) {},
      afteredit: function (e) {
        console.log('After edit. Column: ' + e.field);
      },
      afterrender: function (grid) {
        var cols = grid.down('gridcolumn');
        Ext.each(cols, function (col) {
          var icon = col.getEl().select('.header-icon')
            if (icon) {
              icon.swallowEvent('click', true)
            }
            grid.mon(icon, 'click', function () {
              // action for the header icon click event
              console.log('header icon click fired');
            })
        })
      }
    }
  });
  Ext.getCmp("cust_panel_1").add(vGridPresta);
  var vGridView = Ext.ComponentQuery.query("#CustomPanel dataview ")[0]

    vGridView.on('scroll', function (a, b, c) {
      var d = a.getEl()
        var h = a.getHeight();
      if (d) {
        d = d.dom;
      }
      if (d.scrollTop + 1 >= d.scrollHeight - h && !a.requestInProgress) {
        a.requestInProgress = !0
          console.log("on arrive Ã  la fin")
          var s = Ext.getStore('cust_Grid_SupplierCapacity').gridMetaData;
        if (s.MORERECORDPRESENT === '+') {
          e = {
            'COMPONENT_INFO_TYPE': 'DATA_ONLY',
            'COMPONENT_INFO_TYPE_MODE': 'CACHE',
            'GRID_ID': s.GRIDID,
            'GRID_NAME': s.GRIDNAME,
            'DATASPY_ID': s.DATASPYID,
            'NUMBER_OF_ROWS_FIRST_RETURNED': s.CLIENTROWS,
            'CACHE_REQUEST': !1,
            'CURSOR_POSITION': parseInt(s.CURRENTCURSORPOSITION) + 1
          };
          EAM.Ajax.request({
            url: 'GETCACHE',
            maskEl: Ext.ComponentQuery.query("#CustomPanel")[0],
            params: e,
            async: !0,
            onSuccess: Ext.bind(function (j, i, b, e, f) {
              var a,
              d;
              if (!Ext.isEmpty(b) && EAM.Utils.propertyExists(b, 'pageData.grid.GRIDRESULT.GRID.DATA')) {
                a = b.pageData.grid.GRIDRESULT.GRID;
                e.gridMetaData = a.METADATA;
                d = a.DATA;
                //Ext.getStore('cust_Grid_SupplierCapacity').loadData(Ext.isArray(d) ? d : [], !0)

                var vG = b.pageData.grid.GRIDRESULT.GRID
                  Ext.getStore('cust_Grid_SupplierCapacity').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
                  Ext.getStore('cust_Grid_SupplierCapacity').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
                  Ext.getStore('cust_Grid_SupplierCapacity').gridMetaData = vG.METADATA

                  vG.DATA.forEach(function (rec) {
                    var vReuseChk = false;
                    if (rec.reuse_period == '+') {
                      vReuseChk = true;
                    } else {
                      vReuseChk = false;
                    }
                    Ext.getStore('cust_Grid_SupplierCapacity').add(new Ext.data.Record({
                        row_id: rec.id,
                        dataspy: rec.dataspy,
                        ligne: rec.ligne,
                        reuse_period: vReuseChk,
                        supplier_code: rec.supplier_code,
                        trade: rec.trade,
                        start_date: new Date(EAM.Utils.dateDTypeConvert(rec.start_date, EAM.AppData.getAppData().dateformat)),
                        end_date: new Date(EAM.Utils.dateDTypeConvert(rec.end_date, EAM.AppData.getAppData().dateformat)),
                        avail_day: rec.avail_day,
                        supplier_org: rec.supplier_org

                      }));
                  })
              }
              f.requestInProgress = !1
            }, this, [d, c], !0)
          })
        } else {
          a.requestInProgress = !1
        }

      }

    })

  function addScrollEventListener(comp) {
    comp.getTargetEl().on('mouseup', function (e, t) {
      var height = comp.getTargetEl().getHeight();
      if (height + t.scrollTop >= t.scrollHeight) {
        console.log('mouseup');
      }
    });
    comp.getTargetEl().on('wheeldown', function (e, t) {
      var height = comp.getTargetEl().getHeight();
      if (height + t.scrollTop >= t.scrollHeight) {
        console.log('wheeldown');
      }
    });
  }
  panel.show()
}
function adjust_existing_capacity(_1, _2, _3, _4, _5) {
  var newLine = _1;
  var vGrid = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      GRID_NAME: "XUSUP2",
      GRID_TYPE: "LOV",
      REQUEST_TYPE: "LOV.HEAD_DATA.STORED",
      usagetype: "lov",
      LOV_ALIAS_NAME_1: "suppliercode",
      LOV_ALIAS_TYPE_1: "text",
      LOV_ALIAS_VALUE_1: Ext.getCmp("cust_supplier").getValue(),
      LOV_ALIAS_NAME_2: "supplierorg",
      LOV_ALIAS_TYPE_2: "text",
      LOV_ALIAS_VALUE_2: Ext.getCmp("cust_supplier_org").getValue(),
      LOV_ALIAS_NAME_3: "trade",
      LOV_ALIAS_TYPE_3: 'text',
      LOV_ALIAS_VALUE_3: Ext.getCmp("cust_trade").getValue(),
      LOV_ALIAS_NAME_4: "startdate",
      LOV_ALIAS_TYPE_4: 'text',
      LOV_ALIAS_VALUE_4: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_1").getValue()), 'm/d/Y'),
      LOV_ALIAS_NAME_5: "enddate",
      LOV_ALIAS_TYPE_5: 'text',
      LOV_ALIAS_VALUE_5: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y'),
      LOV_ALIAS_NAME_6: "dataspy",
      LOV_ALIAS_TYPE_6: 'text',
      LOV_ALIAS_VALUE_6: Ext.getCmp("cust_dataspy").getValue()
    }
  });
  if (EAM.Utils.propertyExists(vGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vListOfData = vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA
        vListOfData.forEach(function (rec) {
          var _go = true
            var dStart = new Date(EAM.Utils.dateDTypeConvert(rec.start_date, EAM.AppData.getAppData().dateformat)),
          dEnd = new Date(EAM.Utils.dateDTypeConvert(rec.end_date, EAM.AppData.getAppData().dateformat))
            var dNewStart = new Date(Ext.getCmp("cust_date_deb_1").getValue())
            var dNewEnd = new Date(Ext.getCmp("cust_date_deb_2").getValue())
            /* Case 1
            si ddnl > ddle et dfle > ddnl et
             */
            if ((((dNewStart.getTime() - dStart.getTime()) > 0 && (dEnd.getTime() - dNewStart.getTime()) > 0 && (dNewEnd.getTime() - dEnd.getTime()) > 0)
                /*||((dNewStart.getTime()-dStart.getTime())>0&&(dEnd.getTime()-dNewEnd.getTime())==0)*/
              ) && _go) {
              console.log("cas 1")
              _go = false;
              var dNewEnd2 = new Date(dNewStart)
                dNewEnd2.setDate(dNewEnd2.getDate() - 1)

                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_ligne: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPSP"
                vRecordToUpdate["wspf_10_end_date"] = Ext.Date.format(dNewEnd2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });

            }
            /* Cas 2*/
            if ((((dNewStart.getTime() - dStart.getTime()) < 0 && (dEnd.getTime() - dNewEnd.getTime()) == 0)) && _go) {
              console.log("cas 2")
              _go = false;
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "SSSUPP",
                  USER_FUNCTION_NAME: "SSSUPP",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_ligne: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPSP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });
            }
            /* Cas 2.1*/
            if ((((dNewStart.getTime() - dStart.getTime()) < 0 && (dEnd.getTime() - dNewEnd.getTime()) < 0)) && _go) {
              console.log("cas 2.1")
              _go = false;
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "SSSUPP",
                  USER_FUNCTION_NAME: "SSSUPP",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_ligne: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPSP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });
            }
            /* Cas 3*/
            if ((((dStart.getTime() - dNewStart.getTime()) > 0 && (dNewEnd.getTime() - dStart.getTime()) > 0 && (dEnd.getTime() - dNewEnd.getTime()) > 0) ||
                ((dStart.getTime() - dNewStart.getTime()) > 0 && (dStart.getTime() - dNewEnd.getTime()) == 0)) && _go) {
              _go = false;
              console.log("cas 3")
              var dNewStart2 = new Date(dNewEnd)
                dNewStart2.setDate(dNewStart2.getDate() + 1)

                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_ligne: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPSP"
                vRecordToUpdate["wspf_10_start_date"] = Ext.Date.format(dNewStart2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });
            }
            /*Cas 4*/
            if ((((dStart.getTime() - dNewStart.getTime()) < 0 && (dEnd.getTime() - dNewEnd.getTime()) == 0)) && _go) {
              /*||((dNewStart.getTime()-dStart.getTime())>0&&(dEnd.getTime()-dNewEnd.getTime())==0)*/
              _go = false;
              console.log("cas 4")
              var dNewEnd2 = new Date(dNewStart)
                dNewEnd2.setDate(dNewEnd2.getDate() - 1)

                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_ligne: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPSP"
                vRecordToUpdate["wspf_10_end_date"] = Ext.Date.format(dNewEnd2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });
            }
            /* Cas 5*/
            if ((((dStart.getTime() - dNewStart.getTime()) == 0 && (dEnd.getTime() - dNewEnd.getTime()) < 0)) && _go) {
              _go = false;
              console.log("cas 5")
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "SSSUPP",
                  USER_FUNCTION_NAME: "SSSUPP",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_ligne: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPSP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });
            }
            /*Cas 6 */
            if ((((dStart.getTime() - dNewStart.getTime()) < 0 && (dEnd.getTime() - dNewEnd.getTime()) > 0)) && _go) {
              _go = false;
              console.log("cas 6")
              var dNewEnd2 = new Date(dNewStart)
                dNewEnd2.setDate(dNewEnd2.getDate() - 1)
                var dNewStart2 = new Date(dNewEnd)
                dNewStart2.setDate(dNewStart2.getDate() + 1)
                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_ligne: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPSP"
                vRecordToUpdate["wspf_10_end_date"] = Ext.Date.format(dNewEnd2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });

              newLine = newLine + 1;

              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "SSSUPP",
                  USER_FUNCTION_NAME: "SSSUPP",
                  CURRENT_TAB_NAME: "U2",
                  suppliercode: Ext.getCmp("cust_supplier").getValue(),
                  supplierorganization: Ext.getCmp("cust_supplier_org").getValue()
                }
              }).responseData.pageData.values;

              vRecord["can_delete"] = true
                vRecord["can_insert"] = true
                vRecord["can_update"] = true
                vRecord["cfgrouplist"] = null
                vRecord["pagemode"] = "display"
                vRecord["processaction"] = "insert"
                vRecord["recordid"] = null
                vRecord["wspf_10_service"] = null
                vRecord["webservicepromptcode"] = "BUCPSP"
                vRecord["wspf_10_avail_day"] = vRecordToUpdate["wspf_10_avail_day"]
                vRecord["wspf_10_dataspy"] = Ext.getCmp("1").getValue()
                vRecord["wspf_10_end_date"] = Ext.Date.format(new Date(dEnd), 'm/d/Y')
                vRecord["wspf_10_ligne"] = newLine
                vRecord["wspf_10_reuse_period"] = vRecordToUpdate["wspf_10_reuse_period"]

                vRecord["wspf_10_start_date"] = Ext.Date.format(new Date(dNewStart2), 'm/d/Y')
                vRecord["wspf_10_supplier_code"] = Ext.getCmp("cust_supplier").getValue()
                vRecord["wspf_10_supplier_org"] = Ext.getCmp("cust_supplier_org").getValue()
                vRecord["wspf_10_trade"] = Ext.getCmp("cust_trade").getValue()
                vRecord["wsptab"] = "U2"
                vRecord["PKID"] = Ext.getCmp("cust_supplier").getValue() + '#' + Ext.getCmp("cust_supplier_org").getValue() + '#' + newLine
                vRecord["suppliercode"] = Ext.getCmp("cust_supplier").getValue()
                vRecord["supplierorganization"] = Ext.getCmp("cust_supplier_org").getValue()

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.insertrecord?pageaction=SAVE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });

            }
            /*Cas 7 */
            if (((dNewStart.getTime() - dNewEnd.getTime()) == 0 && (dNewStart.getTime() - dStart.getTime()) == 0) && _go) {
              console.log("cas 7")
              _go = false;

              var dNewStart2 = new Date(dStart)
                dNewStart2.setDate(dNewStart2.getDate() + 1)
                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_ligne: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPSP"
                vRecordToUpdate["wspf_10_start_date"] = Ext.Date.format(dNewStart2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });

              newLine = newLine + 1;

            }

            /*Cas 8 */
            if (((dNewStart.getTime() - dNewEnd.getTime()) == 0 && (dNewEnd.getTime() - dEnd.getTime()) == 0) && _go) {
              console.log("cas 8")
              _go = false;

              var dNewStart2 = new Date(dNewEnd)
                dNewStart2.setDate(dNewStart2.getDate() - 1)
                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_ligne: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPSP"
                vRecordToUpdate["wspf_10_end_date"] = Ext.Date.format(dNewStart2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });

              newLine = newLine + 1;

            }

            /*Cas 9 */
            if (((dNewStart.getTime() - dStart.getTime()) == 0 && (dNewEnd.getTime() - dEnd.getTime()) < 0) && _go) {
              console.log("cas 9")
              _go = false;
              var dNewStart2 = new Date(dNewEnd)
                dNewStart2.setDate(dNewStart2.getDate() + 1)

                var vRecordToUpdate = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    CURRENT_TAB_NAME: "U2",
                    wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                    wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                    wspf_10_ligne: rec.ligne,
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;
              vRecordToUpdate["webservicepromptcode"] = "BUCPSP"
                vRecordToUpdate["wspf_10_start_date"] = Ext.Date.format(dNewStart2, 'm/d/Y')
                vRecordToUpdate["processaction"] = "sync"
                vRecordToUpdate["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                  params: Ext.merge(vRecordToUpdate, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });

              newLine = newLine + 1;

            }
            /*Cas 10 */
            if (((dNewStart.getTime() - dStart.getTime()) == 0 && (dNewStart.getTime() - dEnd.getTime()) == 0) && _go) {
              console.log("cas 10")
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "SSSUPP",
                  USER_FUNCTION_NAME: "SSSUPP",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_ligne: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPSP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });

            }
            /*Cas 11 */
            if (((dNewEnd.getTime() - dStart.getTime()) == 0 && (dNewEnd.getTime() - dEnd.getTime()) == 0) && _go) {
              console.log("cas 11")
              var vRecord = EAM.Ajax.request({
                url: "BSUDSC.TAB",
                params: {
                  SYSTEM_FUNCTION_NAME: "SSSUPP",
                  USER_FUNCTION_NAME: "SSSUPP",
                  CURRENT_TAB_NAME: "U2",
                  wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                  wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                  wspf_10_ligne: rec.ligne,
                  pagemode: "view",
                  processaction: "get",
                  REFRESH_GRID: false,
                  ONLY_DATA_REQUIRED: true
                }
              }).responseData.pageData.values;
              vRecord["webservicepromptcode"] = "BUCPSP"
                vRecord["processaction"] = "delete"
                vRecord["pagemode"] = "view"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "U2",
                    SYSTEM_FUNCTION_NAME: "SSSUPP",
                    USER_FUNCTION_NAME: "SSSUPP",
                    can_update: "true",
                  })
                });

            }

        })
    }
  }

}
function cust_capacity_refreshGrid() {

  var vYear1 = Ext.getCmp("cust_from_year").standardValue; ///Ext.getCmp("cust_from_year").getValue();
  var vYear2 = Ext.getCmp("cust_to_year").standardValue; //Ext.getCmp("cust_to_year").getValue();
  var vSuppliercode = Ext.getCmp("cust_supplier").getValue();
  var vSupplierOrg = Ext.getCmp("cust_supplier_org").getValue();
  var vDataspy = "1";
  var vTradeCode = "*";
  var vDateYear1 = Ext.Date.format(new Date(vYear1, 0, 1), 'm/d/Y')
    var vDateYear2 = Ext.Date.format(new Date(vYear2, 11, 31), 'm/d/Y')
    Ext.getStore("cust_Grid_SupplierCapacity").flushLoad()
    Ext.getStore("cust_Grid_SupplierCapacity").removeAll()
    var vGrid = EAM.Ajax.request({
      url: "GRIDDATA",
      params: {
        GRID_NAME: "XUSUPC",
        GRID_TYPE: "LOV",
        REQUEST_TYPE: "LOV.HEAD_DATA.STORED",
        usagetype: "lov",
        //maskEl: Ext.ComponentQuery.query("#CustomPanel")[0],
        LOV_ALIAS_NAME_1: "suppliercode",
        LOV_ALIAS_TYPE_1: "text",
        LOV_ALIAS_VALUE_1: vSuppliercode,
        LOV_ALIAS_NAME_2: "supplierorg",
        LOV_ALIAS_TYPE_2: "text",
        LOV_ALIAS_VALUE_2: vSupplierOrg,
        LOV_ALIAS_NAME_3: "trade",
        LOV_ALIAS_TYPE_3: 'text',
        LOV_ALIAS_VALUE_3: vTradeCode,
        LOV_ALIAS_NAME_4: "startdate",
        LOV_ALIAS_TYPE_4: 'text',
        LOV_ALIAS_VALUE_4: vDateYear1,
        LOV_ALIAS_NAME_5: "enddate",
        LOV_ALIAS_TYPE_5: 'text',
        LOV_ALIAS_VALUE_5: vDateYear2,
        LOV_ALIAS_NAME_6: "dataspy",
        LOV_ALIAS_TYPE_6: 'text',
        LOV_ALIAS_VALUE_6: vDataspy
      }
    });
  if (!Ext.isEmpty(vGrid) && EAM.Utils.propertyExists(vGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vG = vGrid.responseData.pageData.grid.GRIDRESULT.GRID
        vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
        vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_SupplierCapacity').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
        Ext.getStore('cust_Grid_SupplierCapacity').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_SupplierCapacity').gridMetaData = vG.METADATA

        vG.DATA.forEach(function (rec) {
          var vReuseChk = false;
          if (rec.reuse_period == '+') {
            vReuseChk = true;
          } else {
            vReuseChk = false;
          }
          Ext.getStore('cust_Grid_SupplierCapacity').add(new Ext.data.Record({
              row_id: rec.id,
              dataspy: rec.dataspy,
              ligne: rec.ligne,
              reuse_period: vReuseChk,
              supplier_code: rec.supplier_code,
              trade: rec.trade,
              start_date: new Date(EAM.Utils.dateDTypeConvert(rec.start_date, EAM.AppData.getAppData().dateformat)),
              end_date: new Date(EAM.Utils.dateDTypeConvert(rec.end_date, EAM.AppData.getAppData().dateformat)),
              avail_day: rec.avail_day,
              supplier_org: rec.supplier_org,
              last_row: rec.last_row

            }));
        })

    }
    Ext.getStore('cust_Grid_SupplierCapacity').totalCount = vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
  }
  Ext.getCmp("cust_date_deb_1").setValue("")
  Ext.getCmp("cust_date_deb_2").setValue("")
  Ext.getCmp("avail_qty_fld1").setValue("")
  gantt.config.capacity_mode = "display";

}
function adjust_supplier_capacity(a, b, c, d, e, vBoilerList) {
  var vSuppliercode = a,
  vSupplierOrg = b,
  vSupplierDesc = c,
  vTradeCode = "*",
  vTradeDesc = e;

  var vYear1 = parseInt((new Date()).getFullYear()) + 0;
  var vYear2 = parseInt((new Date()).getFullYear()) + 1;
  var vDateYear1 = Ext.Date.format(new Date(vYear1, 0, 1), 'm/d/Y')
    var vDateYear2 = Ext.Date.format(new Date(vYear2, 11, 31), 'm/d/Y')
    var vDataspy = '1';
  var vDataspyDesc = Ext.getCmp("filter").rawValue;
  var vLastRow = 0;
  if (Ext.getStore("cust_temp_screendata")) {
    Ext.getStore("cust_temp_screendata").destroy();
  }

  var vCust_temp_screendata = Ext.create('Ext.data.Store', {
    id: 'cust_temp_screendata',
    fields: [],
    data: []
  })
    var vInfoTab = EAM.Ajax.request({
      url: "BSUDSC.TAB",
      params: {
        SYSTEM_FUNCTION_NAME: "SSSUPP",
        USER_FUNCTION_NAME: "SSSUPP",
        CURRENT_TAB_NAME: "U2",
        suppliercode: vSuppliercode,
        supplierorganization: vSupplierOrg
      },
      messagingOptions: {
        deferConfirm: !0,
        deferWarning: !0,
        deferError: !0
      }
    });
  if (vInfoTab && EAM.Utils.propertyExists(vInfoTab, 'responseData.pageData')) {
    Ext.getStore("cust_temp_screendata").responseData = vInfoTab.responseData
  }
  /*
  var vUserData = EAM.Ajax.request({
  url: "GRIDDATA",
  params: {
  SYSTEM_FUNCTION_NAME: "XUPLUI",
  USER_FUNCTION_NAME: "XUPLUI"
  }
  }).responseData;
   */
  var vGrid = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      SYSTEM_FUNCTION_NAME: "XUSUPC",
      USER_FUNCTION_NAME: "XUSUPC",
      //GRID_NAME: "XUSUPC",
      //GRID_TYPE: "LOV",
      REQUEST_TYPE: "LOV.HEAD_DATA.STORED",
      usagetype: "lov",
      LOV_ALIAS_NAME_1: "suppliercode",
      LOV_ALIAS_TYPE_1: "text",
      LOV_ALIAS_VALUE_1: vSuppliercode,
      LOV_ALIAS_NAME_2: "supplierorg",
      LOV_ALIAS_TYPE_2: "text",
      LOV_ALIAS_VALUE_2: vSupplierOrg,
      LOV_ALIAS_NAME_3: "trade",
      LOV_ALIAS_TYPE_3: 'text',
      LOV_ALIAS_VALUE_3: vTradeCode,
      LOV_ALIAS_NAME_4: "startdate",
      LOV_ALIAS_TYPE_4: 'text',
      LOV_ALIAS_VALUE_4: vDateYear1,
      LOV_ALIAS_NAME_5: "enddate",
      LOV_ALIAS_TYPE_5: 'text',
      LOV_ALIAS_VALUE_5: vDateYear2,
      LOV_ALIAS_NAME_6: "dataspy",
      LOV_ALIAS_TYPE_6: 'text',
      LOV_ALIAS_VALUE_6: vDataspy
    }
  });
  if (EAM.Utils.propertyExists(vGrid, "responseData.pageData.grid.GRIDRESULT.GRID.DATA")) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      vLastRow = parseInt(vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA[0].last_row)
    }
  }
  if (Ext.getCmp("cust_Grid_SupplierCapacity")) {
    Ext.getCmp("cust_Grid_SupplierCapacity").destroy();
  }
  if (Ext.getCmp("cust_Grid_ListOfSupplierCapacity")) {
    Ext.getCmp("cust_Grid_ListOfSupplierCapacity").destroy();
  }
  var vFields = []
  var vPrefactStore = Ext.create('Ext.data.Store', {
    id: 'cust_Grid_SupplierCapacity',
    fields: vFields,
    autoLoad: true,
    autoSync: true,
    pageSize: 200,
    listeners: {
      sort: function (a, b) {
        console.log("sortstore");
        var v = Ext.getStore('cust_Grid_SupplierCapacity')
          if (v) {
            v.proxy.data = [];
            for (i = 0; i < v.data.items.length; i++) {
              v.proxy.data.push(v.data.items[i].data)
            }
          }
      },
      storechange: function (a, c, d, e) {
        console.log("storechange")
      },
      change: function (a, c, d, e) {
        console.log("storechange2")
      }
    },
    proxy: {
      type: 'memory',
      enablePaging: true,
      reader: {
        type: 'json',
        rootProperty: 'data',
        totalProperty: 'total'
      }
    }
  });

  Ext.getStore("cust_Grid_SupplierCapacity").flushLoad()
  Ext.getStore("cust_Grid_SupplierCapacity").removeAll()
  var vModeRecortPresent = '-'
    var vCURRENTCURSORPOSITION = 0;
  if (!Ext.isEmpty(vGrid) && EAM.Utils.propertyExists(vGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vG = vGrid.responseData.pageData.grid.GRIDRESULT.GRID
        vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
        vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_SupplierCapacity').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
        Ext.getStore('cust_Grid_SupplierCapacity').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_SupplierCapacity').gridMetaData = vG.METADATA

        vG.DATA.forEach(function (rec) {
          vReuseChk = false;
          if (rec.reuse_period == "+") {
            vReuseChk = true;
          } else {
            vReuseChk = false;
          }

          Ext.getStore('cust_Grid_SupplierCapacity').add(new Ext.data.Record({
              row_id: rec.id,
              dataspy: rec.dataspy,
              ligne: rec.ligne,
              reuse_period: vReuseChk,
              supplier_code: rec.supplier_code,
              trade: rec.trade,
              start_date: new Date(EAM.Utils.dateDTypeConvert(rec.start_date, EAM.AppData.getAppData().dateformat)),
              end_date: new Date(EAM.Utils.dateDTypeConvert(rec.end_date, EAM.AppData.getAppData().dateformat)),
              avail_day: rec.avail_day,
              supplier_org: rec.supplier_org

            }));
        })

    }
    Ext.getStore('cust_Grid_SupplierCapacity').totalCount = vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
  }
  if (Ext.getCmp("gantt.adj_dataspy.store")) {
    Ext.getCmp("gantt.adj_dataspy.store").destroy();
  }
  if (Ext.getCmp("gantt.adj_supplier.store")) {
    Ext.getCmp("gantt.adj_supplier.store").destroy();
  }
  if (Ext.getCmp("gantt.adj_trade.store")) {
    Ext.getCmp("gantt.adj_trade.store").destroy();
  }
  var vDataspyStoreCust = Ext.create('Ext.data.Store', {
    id: 'gantt.adj_dataspy.store',
    fields: ['code', 'description'],
    data: [{
        "code": vDataspy,
        "description": vDataspyDesc
      }
    ]
  });

  var vSupplierStore = Ext.create('Ext.data.Store', {
    id: 'gantt.adj_supplier.store',
    fields: ['code', 'description'],
    data: [{
        "code": vSuppliercode,
        "description": vSupplierDesc
      }
    ]
  });
  var vTradeStore = Ext.create('Ext.data.Store', {
    id: 'gantt.adj_trade.store',
    fields: ['code', 'description'],
    data: [{
        "code": vTradeCode,
        "description": vTradeDesc
      }
    ]
  });

  var panel = new Ext.Panel({
    title: gantt.locale.labels.adj_capac_formtitle,
    frame: true,
    width: 1500,
    id: 'CustomPanel',
    height: 800,
    modal: true,
    closable: true,
    centered: true,
    floating: true,
    closable: false,
    resizable: true,
    layout: 'vbox',
    draggable: true,
    margins: '5 5 5 5',
    layoutConfig: {
      animate: true
    },
    items: [{
        //title: 'Filtre',
        id: "cust_panel_3",
        region: 'north',
        xtype: 'panel',
        split: true,
        collapsible: false,
        width: '100%',
        height: '20%',
        layout: 'column',
        defaults: {
          //columnWidth: 0.33
        },
        items: [{
            id: "cust_panel_1_sub_1",
            scrollable: true,
            //region: 'north',   // position for region
            xtype: 'panel',
            height: "50%",
            width: '100%',
            layout: 'column',
            split: true, // enable resizing
            margin: '0 5 5 5',
            items: [{
                xtype: 'combobox',
                store: vSupplierStore,
                queryMode: 'local',
                displayField: 'description',
                valueField: 'code',
                value: vSuppliercode,
                id: "cust_supplier",
                name: 'cust_supplier',
                colspan: 1,
                rowspan: 1,
                fieldLabel: gantt.locale.labels.adj_capac_supplier,
                maxLength: 15,
                padding: "10px",
                readOnly: !0,
                readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
              }, {
                name: 'cust_supplier_org',
                id: "cust_supplier_org",
                xtype: 'textfield',
                colspan: 1,
                rowspan: 1,
                fieldLabel: gantt.locale.labels.adj_capac_supplier_org,
                maxLength: 15,
                value: vSupplierOrg,
                upper: !0,
                hidden: true,
                padding: "10px",
                readOnly: !0,
                readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
              }, {
                xtype: 'combobox',
                store: vTradeStore,
                queryMode: 'local',
                displayField: 'description',
                valueField: 'code',
                value: vTradeCode,
                id: "cust_trade",
                name: 'cust_trade',
                colspan: 1,
                rowspan: 1,
                hidden: true,
                fieldLabel: gantt.locale.labels.adj_capac_trade,
                maxLength: 15,
                padding: "10px",
                readOnly: !0,
                readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
              }, {
                xtype: 'combobox',
                store: vDataspyStoreCust,
                queryMode: 'local',
                displayField: 'description',
                valueField: 'code',
                value: vDataspy,
                id: "cust_dataspy",
                name: 'cust_dataspy',
                colspan: 1,
                rowspan: 1,
                hidden: true,
                fieldLabel: gantt.locale.labels.adj_capac_dataspy,
                maxLength: 15,
                padding: "10px",
                readOnly: !0,
                readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
              }

            ]
          }, {
            id: "cust_panel_1_sub_2",
            scrollable: true,
            //region: 'north',   // position for region
            xtype: 'panel',
            height: "50%",
            width: '100%',
            layout: 'column',
            defaults: {
              //columnWidth: 0.333
            },
            tools: [{
                iconCls: 'toolbarReset',
                tooltip: gantt.locale.labels.adj_capac_tooltip_refresh,
                // left: "50%",
                callback: function () {
                  cust_capacity_refreshGrid();

                }
              }
            ],
            split: true, // enable resizing
            margin: '0 5 5 5',
            items: [{
                name: 'cust_from_year',
                id: "cust_from_year",
                vtype: "integer",
                numberFormat: "4,0",
                xtype: 'uxnumber',
                colspan: 1,
                rowspan: 1,
                fieldLabel: gantt.locale.labels.adj_capac_fromyear,
                maxLength: 15,
                value: vYear1,
                upper: !0,
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field'
              }, {
                name: 'cust_to_year',
                id: "cust_to_year",
                xtype: 'uxnumber',
                vtype: "integer",
                numberFormat: "4,0",
                colspan: 1,
                rowspan: 1,
                fieldLabel: gantt.locale.labels.adj_capac_toyear,
                maxLength: 15,
                value: vYear2,
                upper: !0,
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field'
              }
            ]
          }

        ]
      }, {
        //title: 'Filtre',
        id: "cust_panel_1",
        region: 'center',
        xtype: 'panel',
        split: true,
        //collapsible: false,
        //scrollable:true,
        layout: "fit",
        width: '100%',
        height: '60%',
        padding: '10px'
      }, {
        //title: 'Filtre',
        id: "cust_panel_2",
        split: true,
        xtype: 'panel',
        layout: 'column',
        defaults: {
          columnWidth: 0.5
        },
        width: '100%',
        //layout : 'fit',
        collapsible: false,
        region: 'center',
        tools: [{

            iconCls: 'toolbarSave',
            tooltip: gantt.locale.labels.adj_capac_tooltip_save,
            style: {
              left: "0px"
            },
            docked: 'left',
            callback: function (a, b, c, d) {
              // show help here
              var newLine = 1;
              var vGridIndos = EAM.Ajax.request({
                url: "GRIDDATA",
                params: {
                  GRID_NAME: "XUSUP3",
                  GRID_TYPE: "LOV",
                  REQUEST_TYPE: "LOV.HEAD_DATA.STORED",
                  usagetype: "lov",
                  LOV_ALIAS_NAME_1: "suppliercode",
                  LOV_ALIAS_TYPE_1: "text",
                  LOV_ALIAS_VALUE_1: vSuppliercode,
                  LOV_ALIAS_NAME_2: "supplierorg",
                  LOV_ALIAS_TYPE_2: "text",
                  LOV_ALIAS_VALUE_2: vSupplierOrg
                }
              });
              if (EAM.Utils.propertyExists(vGridIndos, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
                if (vGridIndos.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
                  newLine = parseInt(vGridIndos.responseData.pageData.grid.GRIDRESULT.GRID.DATA[0].last_row) + 1
                }
              }
              var dStart = new Date(Ext.getCmp("cust_date_deb_1").getValue())
                var dEnd = new Date(Ext.getCmp("cust_date_deb_2").getValue())
                var nValue = parseFloat(Ext.getCmp("avail_qty_fld1").getValue())
                var bTest = true;
              if ((dEnd - dStart) < 0) {
                Ext.getCmp("cust_date_deb_2").markInvalid(vBoilerList["      adj_date_greater"])
                bTest = false;
              }
              if (Ext.getCmp("cust_date_deb_1").getValue() == "") {
                Ext.getCmp("cust_date_deb_1").markInvalid(vBoilerList["adj_required_field"])
                bTest = false;
              }
              if (Ext.getCmp("cust_date_deb_2").getValue() == "") {
                Ext.getCmp("cust_date_deb_2").markInvalid(vBoilerList["adj_required_field"])
                bTest = false;
              }
              if (nValue <= 0 || isNaN(nValue) || nValue == null || nValue == "") {
                Ext.getCmp("avail_qty_fld1").markInvalid(vBoilerList["adj_value_greater_than0"])
                bTest = false;
              }
              if (!bTest) {
                return false;
              }
              if (gantt.config.capacity_mode == "display") {
                var vReusePeriod = "0"
                  if (Ext.getCmp("reuse_period_fld1").getValue()) {
                    vReusePeriod = "-1"
                  } else {
                    vReusePeriod = "0"
                  }
                  var vGrid = EAM.Ajax.request({
                    url: "BSUDSC.TAB.xmlhttp",
                    params: {
                      GRID_NAME: "SSSUPP_U2",
                      USER_FUNCTION_NAME: "SSSUPP",
                      SYSTEM_FUNCTION_NAME: "SSSUPP",
                      CURRENT_TAB_NAME: "U2",
                      COMPONENT_INFO_TYPE: "DATA_ONLY",
                      suppliercode: Ext.getCmp("cust_supplier").getValue(),
                      supplierorganization: Ext.getCmp("cust_supplier_org").getValue(),
                      MADDON_FILTER_ALIAS_NAME_1: "wspf_10_supplier_code",
                      MADDON_FILTER_OPERATOR_1: "=",
                      MADDON_FILTER_JOINER_1: "AND",
                      MADDON_FILTER_SEQNUM_1: 1,
                      MADDON_FILTER_VALUE_1: Ext.getCmp("cust_supplier").getValue(),
                      MADDON_LPAREN_1: false,
                      MADDON_RPAREN_1: false,
                      MADDON_FILTER_ALIAS_NAME_2: "wspf_10_supplier_org",
                      MADDON_FILTER_OPERATOR_2: "=",
                      MADDON_FILTER_JOINER_2: "AND",
                      MADDON_FILTER_SEQNUM_2: 2,
                      MADDON_FILTER_VALUE_2: Ext.getCmp("cust_supplier_org").getValue(),
                      MADDON_LPAREN_2: false,
                      MADDON_RPAREN_2: false,
                      MADDON_FILTER_ALIAS_NAME_3: "wspf_10_trade",
                      MADDON_FILTER_OPERATOR_3: "=",
                      MADDON_FILTER_JOINER_3: "AND",
                      MADDON_FILTER_SEQNUM_3: 3,
                      MADDON_FILTER_VALUE_3: Ext.getCmp("cust_trade").getValue(),
                      MADDON_LPAREN_3: false,
                      MADDON_RPAREN_3: false,
                      MADDON_FILTER_ALIAS_NAME_4: "wspf_10_start_date",
                      MADDON_FILTER_OPERATOR_4: "=",
                      MADDON_FILTER_JOINER_4: "AND",
                      MADDON_FILTER_SEQNUM_4: 4,
                      MADDON_FILTER_VALUE_4: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_1").getValue()), 'm/d/Y'),
                      MADDON_LPAREN_4: false,
                      MADDON_RPAREN_4: false,
                      MADDON_FILTER_ALIAS_NAME_5: "wspf_10_end_date",
                      MADDON_FILTER_OPERATOR_5: "=",
                      MADDON_FILTER_JOINER_5: "AND",
                      MADDON_FILTER_SEQNUM_5: 5,
                      MADDON_FILTER_VALUE_5: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y'),
                      MADDON_LPAREN_5: false,
                      MADDON_RPAREN_5: false,
                      MADDON_FILTER_ALIAS_NAME_6: "wspf_10_reuse_period",
                      MADDON_FILTER_OPERATOR_6: "=",
                      MADDON_FILTER_JOINER_6: "AND",
                      MADDON_FILTER_SEQNUM_6: 6,
                      MADDON_FILTER_VALUE_6: vReusePeriod,
                      MADDON_LPAREN_6: false,
                      MADDON_RPAREN_6: false,
                      MADDON_FILTER_ALIAS_NAME_7: "wspf_10_dataspy",
                      MADDON_FILTER_OPERATOR_7: "=",
                      MADDON_FILTER_JOINER_7: "AND",
                      MADDON_FILTER_SEQNUM_7: 7,
                      MADDON_FILTER_VALUE_7: "1",
                      MADDON_LPAREN_7: false,
                      MADDON_RPAREN_7: false,
                    }
                  });
                if (EAM.Utils.propertyExists(vGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
                  if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
                    EAM.Messaging.showError("Une ligne existe dÃ©jÃ  pour ces dates.");
                    return false;
                  }
                }
              }
              if (gantt.config.capacity_mode == "display") {
                if (Ext.getCmp("cust_date_deb_1").getValue().toString() != "" &&
                  Ext.getCmp("cust_date_deb_2").getValue().toString() != "" &&
                  Ext.getCmp("avail_qty_fld1").getValue().toString() != "")

                  var vRecord = EAM.Ajax.request({
                    url: "BSUDSC.TAB",
                    params: {
                      SYSTEM_FUNCTION_NAME: "SSSUPP",
                      USER_FUNCTION_NAME: "SSSUPP",
                      CURRENT_TAB_NAME: "U2",
                      suppliercode: Ext.getCmp("cust_supplier").getValue(),
                      supplierorganization: Ext.getCmp("cust_supplier_org").getValue()
                    }
                  }).responseData.pageData.values;

                vRecord["can_delete"] = true
                  vRecord["can_insert"] = true
                  vRecord["can_update"] = true
                  vRecord["cfgrouplist"] = null
                  vRecord["pagemode"] = "display"
                  vRecord["processaction"] = "insert"
                  vRecord["recordid"] = null
                  vRecord["wspf_10_service"] = null
                  vRecord["webservicepromptcode"] = "BUCPSP"
                  vRecord["wspf_10_avail_day"] = parseFloat(Ext.getCmp("avail_qty_fld1").getValue())
                  vRecord["wspf_10_dataspy"] = "1"
                  vRecord["wspf_10_end_date"] = Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y')
                  vRecord["wspf_10_ligne"] = newLine
                  if (Ext.getCmp("reuse_period_fld1").getValue()) {
                    vRecord["wspf_10_reuse_period"] = "-1"
                  } else {
                    vRecord["wspf_10_reuse_period"] = "0"
                  }
                  vRecord["wspf_10_start_date"] = Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_1").getValue()), 'm/d/Y')
                  vRecord["wspf_10_supplier_code"] = Ext.getCmp("cust_supplier").getValue()
                  vRecord["wspf_10_supplier_org"] = Ext.getCmp("cust_supplier_org").getValue()
                  vRecord["wspf_10_trade"] = Ext.getCmp("cust_trade").getValue()
                  vRecord["wsptab"] = "U2"
                  vRecord["PKID"] = Ext.getCmp("cust_supplier").getValue() + '#' + Ext.getCmp("cust_supplier_org").getValue() + '#' + newLine
                  vRecord["suppliercode"] = Ext.getCmp("cust_supplier").getValue()
                  vRecord["supplierorganization"] = Ext.getCmp("cust_supplier_org").getValue()

                  var vStatus = EAM.Ajax.request({
                    url: "BSUDSC.TAB.insertrecord?pageaction=SAVE",
                    params: Ext.merge(vRecord, {
                      CHECK_CF_CHANGEFLAG: "true",
                      CURRENT_TAB_NAME: "U2",
                      SYSTEM_FUNCTION_NAME: "SSSUPP",
                      USER_FUNCTION_NAME: "SSSUPP",
                      can_update: "true",
                    })
                  });
                if (vStatus) {
                  /*On recherche les lignes ayant des dates en conflits*/

                  adjust_existing_capacity(newLine);

                  cust_capacity_refreshGrid();
                }

              }

              if (gantt.config.capacity_mode == "view") {
                if (new Date(gantt.config.capacity_old_date_deb_1).toString() != new Date(Ext.getCmp("cust_date_deb_1").getValue()).toString() ||
                  new Date(gantt.config.capacity_old_date_deb_2).toString() != new Date(Ext.getCmp("cust_date_deb_2").getValue()).toString() ||
                  gantt.config.capacity_old_reuse_period_fld1 != Ext.getCmp("reuse_period_fld1").getValue() ||
                  parseFloat(gantt.config.capacity_old_avail_qty_fld1) != parseFloat(Ext.getCmp("avail_qty_fld1").getValue())) {

                  var vRecord = EAM.Ajax.request({
                    url: "BSUDSC.TAB",
                    params: {
                      SYSTEM_FUNCTION_NAME: "SSSUPP",
                      USER_FUNCTION_NAME: "SSSUPP",
                      CURRENT_TAB_NAME: "U2",
                      wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                      wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                      wspf_10_ligne: Ext.getCmp("cust_line").getValue(),
                      pagemode: "view",
                      processaction: "get",
                      REFRESH_GRID: false,
                      ONLY_DATA_REQUIRED: true
                    }
                  }).responseData.pageData.values;
                  vRecord["webservicepromptcode"] = "BUCPSP"
                    vRecord["wspf_10_start_date"] = Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_1").getValue()), 'm/d/Y')
                    vRecord["wspf_10_end_date"] = Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y')
                    vRecord["wspf_10_avail_day"] = parseFloat(Ext.getCmp("avail_qty_fld1").getValue())
                    vRecord["processaction"] = "sync"
                    vRecord["pagemode"] = "view"
                    if (Ext.getCmp("reuse_period_fld1").getValue()) {
                      vRecord["wspf_10_reuse_period"] = "-1"
                    } else {
                      vRecord["wspf_10_reuse_period"] = "0"
                    }

                    var vStatus = EAM.Ajax.request({
                      url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                      params: Ext.merge(vRecord, {
                        CHECK_CF_CHANGEFLAG: "true",
                        CURRENT_TAB_NAME: "U2",
                        SYSTEM_FUNCTION_NAME: "SSSUPP",
                        USER_FUNCTION_NAME: "SSSUPP",
                        can_update: "true",
                      })
                    });
                  if (vStatus) {
                    adjust_existing_capacity(newLine);
                    cust_capacity_refreshGrid();
                  }
                }
              }

            }
          }, {
            iconCls: 'toolbarNew',
            tooltip: gantt.locale.labels.adj_capac_tooltip_newrec,
            left: "70%",
            align: 'left',
            callback: function () {
              // show help here
              Ext.getCmp("cust_date_deb_1").setValue("")

              Ext.getCmp("cust_date_deb_2").setValue("")

              Ext.getCmp("avail_qty_fld1").setValue("")
              Ext.getCmp("cust_date_deb_1").setReadOnly(false)
              Ext.getCmp("cust_date_deb_2").setReadOnly(false)
              Ext.getCmp("reuse_period_fld1").setReadOnly(false)
              gantt.config.capacity_mode = "display";
            }
          }, {
            iconCls: 'toolbarDelete',
            tooltip: gantt.locale.labels.adj_capac_tooltip_delete,
            //left: "40%",
            align: 'left',
            callback: function () {
              if (gantt.config.capacity_mode == "view") { {

                  var vRecord = EAM.Ajax.request({
                    url: "BSUDSC.TAB",
                    params: {
                      SYSTEM_FUNCTION_NAME: "SSSUPP",
                      USER_FUNCTION_NAME: "SSSUPP",
                      CURRENT_TAB_NAME: "U2",
                      wspf_10_supplier_code: Ext.getCmp("cust_supplier").getValue(),
                      wspf_10_supplier_org: Ext.getCmp("cust_supplier_org").getValue(),
                      wspf_10_ligne: Ext.getCmp("cust_line").getValue(),
                      pagemode: "view",
                      processaction: "get",
                      REFRESH_GRID: false,
                      ONLY_DATA_REQUIRED: true
                    }
                  }).responseData.pageData.values;
                  vRecord["webservicepromptcode"] = "BUCPSP"
                    vRecord["processaction"] = "delete"
                    vRecord["pagemode"] = "view"

                    var vStatus = EAM.Ajax.request({
                      url: "BSUDSC.TAB.deleterecord?pageaction=DELETE",
                      params: Ext.merge(vRecord, {
                        CHECK_CF_CHANGEFLAG: "true",
                        CURRENT_TAB_NAME: "U2",
                        SYSTEM_FUNCTION_NAME: "SSSUPP",
                        USER_FUNCTION_NAME: "SSSUPP",
                        can_update: "true",
                      })
                    });
                  if (vStatus) {
                    cust_capacity_refreshGrid();
                    Ext.getCmp("cust_date_deb_1").setValue("")
                    Ext.getCmp("cust_date_deb_2").setValue("")
                    Ext.getCmp("avail_qty_fld1").setValue("")
                    Ext.getCmp("cust_date_deb_1").setReadOnly(false)
                    Ext.getCmp("cust_date_deb_2").setReadOnly(false)
                    Ext.getCmp("reuse_period_fld1").setReadOnly(false)
                    gantt.config.capacity_mode = "display";
                  }
                }

              }
            }
          }
        ],
        items: [{
            //title: 'Filtre',
            id: "cust_panel_2_sub_1",
            scrollable: true,
            region: 'west', // position for region
            xtype: 'panel',
            height: "100%",
            width: '50%',
            split: true, // enable resizing
            margin: '0 5 5 5',
            items: [{
                xtype: 'uxdate',
                anchor: '100%',
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_start_date.label,
                //fieldLabel: 'From',
                id: 'cust_date_deb_1',
                value: new Date(),
                //format: "d/m/y",
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                listeners: {
                  change: function (a, b, c) {
                    /*if(b===null){
                    Ext.getCmp("cust_date_deb_2").setValue("")
                    }
                    if(b>Ext.getCmp("cust_date_deb_2").getValue()){
                    Ext.getCmp("cust_date_deb_2").setValue("")
                    }*/
                  }
                }
              }, {
                xtype: 'uxnumber',
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_avail_day.label,
                id: 'avail_qty_fld1',
                vtype: "currency",
                numberFormat: "24,6",
                value: 0,
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                padding: "10px"
              }
            ]
          }, {
            //title: 'Filtre',
            id: "cust_panel_2_sub_2",
            region: 'center',
            xtype: 'panel',
            //split:true,
            //collapsible: false,
            //width :'50%',
            height: '100%',
            items: [{
                xtype: 'uxdate',
                anchor: '100%',
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_end_date.label,
                //fieldLabel: 'From',
                id: 'cust_date_deb_2',
                value: new Date(),
                //format: "d/m/y",
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                listeners: {
                  change: function (a, b, c) {
                    /*if(b===null){
                    //Ext.getCmp("cust_date_deb_2").setValue("")
                    }
                    if(b<Ext.getCmp("cust_date_deb_1").getValue()){
                    Ext.getCmp("cust_date_deb_1").setValue("")
                    }*/
                  }
                }
              }, {
                xtype: 'checkbox',
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_reuse_period.label,
                id: 'reuse_period_fld1',
                value: 0,
                padding: "10px"
              }, {
                name: 'cust_line',
                id: "cust_line",
                xtype: 'textfield',
                colspan: 1,
                hidden: true,
                rowspan: 1,
                fieldLabel: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_ligne.label,
                maxLength: 15,
                value: "",
                upper: !0,
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field'

              }
            ]
          }

        ],
      }
    ],
    buttonAlign: 'center',
    buttons: [{
        text: gantt.locale.labels.adj_capac_close,
        margin: '0 0 0 5',
        handler: function () {
          panel.close();
        },
        ui: 'popupfooter'
      }
    ]
  });

  var vGridPresta = Ext.create('Ext.grid.Panel', {
    id: "cust_Grid_ListOfSupplierCapacity",
    xtype: 'editablegrid',
    cust_object: 'shutdown_planning',
    // plugins: [cellEditing]  ,
    store: Ext.getStore('cust_Grid_SupplierCapacity'), //Ext.data.StoreManager.lookup('cust.prefact.values'),
    autoWidth: false,
    titleBar: {
      hidden: true
    },
    header: false,
    //autoHeight:false,
    //height:some-height,
    editable: !1,
    //pluginType: 'EAM.ux.grid.plugin.CellEditing',
    multiSelect: false,
    multiColumnSort: true,
    scrollable: true,
    viewConfig: {
      preserveScrollOnRefresh: false
    },
    dockedItems: [],
    columns: [{
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_supplier_code.label,
        dataIndex: 'supplier_code',
        flex: 15 / 100,
        hidden: true

      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_trade.label,
        dataIndex: 'trade',
        flex: 30 / 100,
        hidden: true
      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_start_date.label,
        dataIndex: 'start_date',
        xtype: 'uxdatecolumn',
        renderer: function (value, metaData, record) {
          return Ext.Date.format(new Date(value), EAM.AppData.getAppData().dateformat)

        },
        flex: 30 / 100
      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_end_date.label,
        dataIndex: 'end_date',
        xtype: 'uxdatecolumn',
        renderer: function (value, metaData, record) {
          return Ext.Date.format(new Date(value), EAM.AppData.getAppData().dateformat)

        },
        flex: 30 / 100
      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_avail_day.label,
        dataIndex: 'avail_day',
        flex: 15 / 100,
        renderer: function (value, metaData, record) {
          if (parseFloat(value) != parseInt(value)) {
            return parseFloat(value).toFixed(2)

          } else {
            return parseInt(value)
          }

        }
      }, {
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_dataspy.label,
        dataIndex: 'dataspy',
        flex: 15 / 100,
        hidden: true,
        renderer: function (value, metaData, record) {
          if (parseFloat(value) != parseInt(value)) {
            return parseFloat(value).toFixed(2)

          } else {
            return parseInt(value)
          }

        }
      }, {
        header: 'Ligne',
        dataIndex: 'ligne',
        flex: 15 / 100,
        hidden: true
      }, {
        xtype: 'uxcheckcolumn',
        header: Ext.getStore("cust_temp_screendata").responseData.labels.wspf_10_reuse_period.label,
        dataIndex: 'reuse_period',
        flex: 15 / 100

      }
    ],
    height: "100%",
    width: "100%",
    listeners: {

      viewready: function (grid, eOpts) {
        console.log("viewready");
        grid.view.getEl().on('scroll', function (a, b, c) {})
      },

      cellclick: function (g, rowIndex, colIndex, e) {
        Ext.getCmp("cust_date_deb_1").setRawValue(new Date(e.data.start_date))
        Ext.getCmp("cust_date_deb_1").setReadOnly(true)
        Ext.getCmp("cust_date_deb_1").setValue(new Date(e.data.start_date))
        gantt.config.capacity_old_date_deb_1 = new Date(e.data.start_date)
          Ext.getCmp("cust_date_deb_2").setRawValue(new Date(e.data.end_date))
          Ext.getCmp("cust_date_deb_2").setValue(new Date(e.data.end_date))
          Ext.getCmp("cust_date_deb_2").setReadOnly(true)
          gantt.config.capacity_old_date_deb_2 = new Date(e.data.end_date)
          Ext.getCmp("cust_line").setValue(e.data.ligne)
          Ext.getCmp("reuse_period_fld1").setValue(e.data.reuse_period)
          Ext.getCmp("reuse_period_fld1").setReadOnly(true)
          gantt.config.capacity_old_reuse_period_fld1 = e.data.reuse_period

          Ext.getCmp("avail_qty_fld1").setValue(e.data.avail_day)

          gantt.config.capacity_old_avail_qty_fld1 = e.data.avail_day

          gantt.config.capacity_mode = "view";

      },
      celldblclick: function (g, rowIndex, colIndex, e) {
        console.log(colIndex);
      },
      storechange: function (sender, value, oldValue, eOpts) {
        console.log("storechange");
      },
      selectionchange: function (a, b, c) {},
      afteredit: function (e) {
        console.log('After edit. Column: ' + e.field);
      },
      afterrender: function (grid) {
        var cols = grid.down('gridcolumn');
        Ext.each(cols, function (col) {
          var icon = col.getEl().select('.header-icon')
            if (icon) {
              icon.swallowEvent('click', true)
            }
            grid.mon(icon, 'click', function () {
              // action for the header icon click event
              console.log('header icon click fired');
            })
        })
      }
    }
  });
  Ext.getCmp("cust_panel_1").add(vGridPresta);
  var vGridView = Ext.ComponentQuery.query("#CustomPanel dataview ")[0]

    vGridView.on('scroll', function (a, b, c) {
      var d = a.getEl()
        var h = a.getHeight();
      if (d) {
        d = d.dom;
      }
      if (d.scrollTop + 1 >= d.scrollHeight - h && !a.requestInProgress) {
        a.requestInProgress = !0
          console.log("on arrive Ã  la fin")
          var s = Ext.getStore('cust_Grid_SupplierCapacity').gridMetaData;
        if (s.MORERECORDPRESENT === '+') {
          e = {
            'COMPONENT_INFO_TYPE': 'DATA_ONLY',
            'COMPONENT_INFO_TYPE_MODE': 'CACHE',
            'GRID_ID': s.GRIDID,
            'GRID_NAME': s.GRIDNAME,
            'DATASPY_ID': s.DATASPYID,
            'NUMBER_OF_ROWS_FIRST_RETURNED': s.CLIENTROWS,
            'CACHE_REQUEST': !1,
            'CURSOR_POSITION': parseInt(s.CURRENTCURSORPOSITION) + 1
          };
          EAM.Ajax.request({
            url: 'GETCACHE',
            maskEl: Ext.ComponentQuery.query("#CustomPanel")[0],
            params: e,
            async: !0,
            onSuccess: Ext.bind(function (j, i, b, e, f) {
              var a,
              d;
              if (!Ext.isEmpty(b) && EAM.Utils.propertyExists(b, 'pageData.grid.GRIDRESULT.GRID.DATA')) {
                a = b.pageData.grid.GRIDRESULT.GRID;
                e.gridMetaData = a.METADATA;
                d = a.DATA;
                //Ext.getStore('cust_Grid_SupplierCapacity').loadData(Ext.isArray(d) ? d : [], !0)

                var vG = b.pageData.grid.GRIDRESULT.GRID
                  Ext.getStore('cust_Grid_SupplierCapacity').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
                  Ext.getStore('cust_Grid_SupplierCapacity').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
                  Ext.getStore('cust_Grid_SupplierCapacity').gridMetaData = vG.METADATA

                  vG.DATA.forEach(function (rec) {
                    var vReuseChk = false;
                    if (rec.reuse_period == '+') {
                      vReuseChk = true;
                    } else {
                      vReuseChk = false;
                    }
                    Ext.getStore('cust_Grid_SupplierCapacity').add(new Ext.data.Record({
                        row_id: rec.id,
                        dataspy: rec.dataspy,
                        ligne: rec.ligne,
                        reuse_period: vReuseChk,
                        supplier_code: rec.supplier_code,
                        trade: rec.trade,
                        start_date: new Date(EAM.Utils.dateDTypeConvert(rec.start_date, EAM.AppData.getAppData().dateformat)),
                        end_date: new Date(EAM.Utils.dateDTypeConvert(rec.end_date, EAM.AppData.getAppData().dateformat)),
                        avail_day: rec.avail_day,
                        supplier_org: rec.supplier_org

                      }));
                  })
              }
              f.requestInProgress = !1
            }, this, [d, c], !0)
          })
        } else {
          a.requestInProgress = !1
        }

      }

    })

  function addScrollEventListener(comp) {
    comp.getTargetEl().on('mouseup', function (e, t) {
      var height = comp.getTargetEl().getHeight();
      if (height + t.scrollTop >= t.scrollHeight) {
        console.log('mouseup');
      }
    });
    comp.getTargetEl().on('wheeldown', function (e, t) {
      var height = comp.getTargetEl().getHeight();
      if (height + t.scrollTop >= t.scrollHeight) {
        console.log('wheeldown');
      }
    });
  }
  panel.show()
}
function reload_emplgrid(a, b, c, d, e, f, g) {

  ntotalObj = parseFloat(Ext.getCmp('main_cust_container_emp_filter1').countOject);
  var vParams = {};
  var _continue = true;

  //itemInCmpIdx :1,

  Ext.getCmp("main_cust_container_emp_filter1").items.items.forEach(function (rec) {
    console.log(rec)
    var vIdx = rec.itemInCmpIdx;
    var vField = null,
    vOperator = null,
    vValue = null;
    console.log(vIdx)
    if (vIdx == 1) {
      vField = Ext.getCmp("gridempfilter1").getValue()
        vOperator = Ext.getCmp("btnFilterOperator").getValue()
        vValue = Ext.getCmp("gridempfilter2").getValue()
    } else {
      vField = Ext.getCmp("gridempfilter1" + '_' + vIdx).getValue()
        vOperator = Ext.getCmp("btnFilterOperator" + '_' + vIdx).getValue()
        vValue = Ext.getCmp("gridempfilter2" + '_' + vIdx).getValue()
    }

    if (Ext.isEmpty(vField) || Ext.isEmpty(vOperator) || Ext.isEmpty(vValue)) {
      _continue = false;
    }

    var vfName = "MADDON_FILTER_ALIAS_NAME_" + vIdx,
    vfOp = "MADDON_FILTER_OPERATOR_" + vIdx,
    vfJoin = "MADDON_FILTER_JOINER_" + vIdx,
    vfSeq = "MADDON_FILTER_SEQNUM_" + vIdx,
    vfValue = "MADDON_FILTER_VALUE_" + vIdx

      vParams[vfName] = vField
      vParams[vfOp] = vOperator
      vParams[vfJoin] = "AND"
      vParams[vfSeq] = vIdx
      vParams[vfValue] = vValue

  })
  if (!_continue && Ext.getCmp("main_cust_container_emp_filter1").items.items.length > 1) {
    return
  }

  if (ntotalObj == 1 && Ext.isEmpty(Ext.getCmp("gridempfilter1").getValue())) {
    var vNewGrid = EAM.Ajax.request({
      url: "GRIDDATA",
      params: {
        usagetype: "lov",
        SYSTEM_FUNCTION_NAME: "BULEMP",
        USER_FUNCTION_NAME: "BULEMP",
        LOV_ALIAS_NAME_1: "parameter.date",
        LOV_ALIAS_TYPE_1: "text",
        LOV_ALIAS_VALUE_1: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y'),
        LOV_ALIAS_NAME_2: "param.org",
        LOV_ALIAS_TYPE_2: "text",
        LOV_ALIAS_VALUE_2: Ext.getCmp('cust_sched_emp').organization
      }

    });
  } else {
    var vNewGrid = EAM.Ajax.request({
      url: "GRIDDATA",
      params: Ext.merge(vParams, {
        usagetype: "lov",
        SYSTEM_FUNCTION_NAME: "BULEMP",
        USER_FUNCTION_NAME: "BULEMP",
        LOV_ALIAS_NAME_1: "parameter.date",
        LOV_ALIAS_TYPE_1: "text",
        LOV_ALIAS_VALUE_1: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y'),
        LOV_ALIAS_NAME_2: "param.org",
        LOV_ALIAS_TYPE_2: "text",
        LOV_ALIAS_VALUE_2: Ext.getCmp('cust_sched_emp').organization
      })

    });

  }

  Ext.getStore("cust_Grid_Employees").flushLoad()
  Ext.getStore("cust_Grid_Employees").removeAll()
  var vModeRecortPresent = '-'
    var vCURRENTCURSORPOSITION = 0;
  if (!Ext.isEmpty(vNewGrid) && EAM.Utils.propertyExists(vNewGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vNewGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vG = vNewGrid.responseData.pageData.grid.GRIDRESULT.GRID
        vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
        vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_Employees').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
        Ext.getStore('cust_Grid_Employees').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_Employees').gridMetaData = vG.METADATA

        vG.DATA.forEach(function (rec) {
          vReuseChk = false;
          if (rec.reuse_period == "+") {
            vReuseChk = true;
          } else {
            vReuseChk = false;
          }

          Ext.getStore('cust_Grid_Employees').add(new Ext.data.Record({
              id: rec.id,
              per_code: rec.per_code,
              per_desc: rec.per_desc,
              per_org: rec.per_org,
              per_trade: rec.per_trade,
              per_mrc: rec.per_mrc,
              avail_hrs: rec.avail_hrs,
              sched_hrs: rec.sched_hrs,
              to_sched_hrs: 0
            }));
        })

    }
    Ext.getStore('cust_Grid_Employees').totalCount = vNewGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
  }

}
function schedule_processSelectedData(records) {
  // VÃ©rifier s'il y a des enregistrements sÃ©lectionnÃ©s
  if (records.length === 0) {
    Ext.Msg.alert('Info', 'No records selected.');
    return;
  }

  var vWo,
  vAct,
  vJobtype,
  vOrg,
  dDate;
  vWo = Ext.getCmp("cust_sch_wo").getValue();
  vAct = Ext.getCmp("cust_sch_act").getValue();
  vOrg = Ext.getCmp("cust_sched_emp").organization;
  dDate = new Date(Ext.getCmp("cust_date_deb_2").getValue());

  var vStmtMsg = "";

  // Parcourir les enregistrements sÃ©lectionnÃ©s et traiter les donnÃ©es
  Ext.Array.each(records, function (record) {
    var vRecordToSCh = EAM.Ajax.request({
      url: "WSJOBS.SCH",
      messagingOptions: {
        deferConfirm: !0,
        deferWarning: !0,
        deferError: !0
      },
      params: {
        SYSTEM_FUNCTION_NAME: 'WSJOBS',
        USER_FUNCTION_NAME: "WSJOBS",
        CURRENT_TAB_NAME: 'SCH',
        projectCodenum: vWo,
        organization: vOrg
      }
    });
    if (!vRecordToSCh.success) {
      vStmtMsg += "Can't open WO sched tab for " + vWo;
      vStmtMsg += '<div style="background-color: red; color: white; padding: 5px; margin-bottom: 5px;">Can t open WO sched tab for ' + vWo + '</div>';

    } else {
      var vParams = []
      if (EAM.Utils.propertyExists(vRecordToSCh, 'responseData.pageData.values')) {
        vParams = vRecordToSCh.responseData.pageData.values;
        for (var k in vParams) {
          if (Ext.isObject(vParams[k])) {
            vParams[k] = vParams[k].selected
          }
        }
        var vHours = 1;
        if (parseFloat(record.get('to_sched_hrs')) > 0) {
          vHours = parseFloat(record.get('to_sched_hrs'));
        }

        vParams.projectfrozen = false
          vParams.is_completed = false
          vParams.is_scheduled_by_woloadbalance = false
          vParams.is_scheduled_by_wolaborsched = false
          vParams.can_delete = true
          vParams.jtauth_can_update = true
          vParams.objmosflag = true
          vParams.is_ppm_revision_control_on = false
          vParams.can_update = true
          vParams.is_scheduled_by_msproject = false
          vParams.deptsecreadonly = false
          vParams.conflict_type = "none"
          vParams.ignore_conflict = true
          vParams.pagemode = "display";
        vParams.conflict_type = "none";
        vParams.ignore_conflict = true;
        vParams.acsresponsible = record.get('per_code');
        vParams.acshours = vHours
          vParams.acssched = Ext.Date.format(dDate, 'm/d/Y')
          vParams.acsactivity = vAct;
        vParams.acsmrc = gantt.getTask(vWo).dds_evt_mrc;
        vParams.acstrade = gantt.getTask(vWo + "#" + vAct + "#0").act_trade;

        var vStatusAcsUpd = EAM.Ajax.request({
          url: "WSJOBS.SCH?pageaction=SAVE",
          messagingOptions: {
            deferConfirm: !0,
            deferWarning: !0,
            deferError: !0
          },
          params: Ext.merge(vParams, {
            SYSTEM_FUNCTION_NAME: "WSJOBS",
            USER_FUNCTION_NAME: "WSJOBS",
            CURRENT_TAB_NAME: "SCH",
            CHECK_CF_CHANGEFLAG: true,
            can_update: true
          })
        });
        if (vStatusAcsUpd.success) {
          if (EAM.Utils.propertyExists(vStatusAcsUpd, 'responseData.pageData.messages')) {
            vStmtMsg += '<div style="background-color: green; color: white; padding: 5px; margin-bottom: 5px;">' + record.get('per_code') + ' assigned successfully</div>';

            //EAM.Messaging.showConfirmation(EAM.Lang.getMessage('MSG_CONFIRM_RECORD_SUCCESSFULLY_SAVED'))
          }
        } else {
          if (EAM.Utils.propertyExists(vStatusAcsUpd, 'responseData.pageData.messages')) {
            vStmtMsg += '<div style="background-color: red; color: white; padding: 5px; margin-bottom: 5px;">Pb with ' + record.get('per_code') + ' ' + vStatusAcsUpd.responseData.pageData.messages[0].msg + '</div>';

          }

        }

      } else {
        vStmtMsg += '<div style="background-color: red; color: white; padding: 5px; margin-bottom: 5px;">Can t open WO sched tab for ' + vWo + '</div>';

      }

    }

    // Exemple de traitement : mettre Ã  jour la colonne 'test' Ã  0


    // Afficher les informations dans la console
    console.log('Name: ' + record.get('name') + ', Age: ' + record.get('age') + ', Test: ' + record.get('test'));
  });
  var vGridSch = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      SYSTEM_FUNCTION_NAME: "BULEPS",
      USER_FUNCTION_NAME: "BULEPS",
      LOV_ALIAS_NAME_1: "parameter.wo",
      LOV_ALIAS_TYPE_1: "text",
      LOV_ALIAS_VALUE_1: vWo,
      LOV_ALIAS_NAME_2: "parameter.activity",
      LOV_ALIAS_TYPE_2: "text",
      LOV_ALIAS_VALUE_2: vAct,
      LOV_ALIAS_NAME_3: "parameter.date",
      LOV_ALIAS_TYPE_3: "text",
      LOV_ALIAS_VALUE_3: Ext.Date.format(dDate, 'm/d/Y')
    }
  });
  Ext.getStore("cust_Grid_EmployeesSched").flushLoad()
  Ext.getStore("cust_Grid_EmployeesSched").removeAll()
  var vModeRecortPresent = '-'
    var vCURRENTCURSORPOSITION = 0;
  if (!Ext.isEmpty(vGridSch) && EAM.Utils.propertyExists(vGridSch, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vGridSch.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vG = vGridSch.responseData.pageData.grid.GRIDRESULT.GRID
        vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
        vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_Employees').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
        Ext.getStore('cust_Grid_Employees').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_Employees').gridMetaData = vG.METADATA

        vG.DATA.forEach(function (rec) {
          vReuseChk = false;
          if (rec.reuse_period == "+") {
            vReuseChk = true;
          } else {
            vReuseChk = false;
          }

          Ext.getStore('cust_Grid_EmployeesSched').add(new Ext.data.Record({
              id: rec.acs_code,
              per_code: rec.per_code,
              per_desc: rec.per_desc,
              sched_hrs: rec.acs_hours,
              acs_date: rec.acs_sched
            }));
        })

    }
    Ext.getStore('cust_Grid_EmployeesSched').totalCount = vGridSch.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
  }

  Ext.getCmp("cust_Grid_ListOfEmployees").getView().grid.getSelectionModel().deselectAll();

  // Afficher un message aprÃ¨s le traitement
  Ext.Msg.alert('schedule process', vStmtMsg);
}
function schedule_editrecord(record) {

  if (Ext.getCmp('EventEditPanel')) {
    try {
      Ext.getCmp('EventEditPanel').destroy();
    } catch (err) {}
  }

  var EditPanel = new Ext.Panel({
    title: "Edit",
    frame: true,
    width: 481,
    id: 'EventEditPanel',
    height: 300,
    modal: true,
    resizable: !0,
    closable: false,
    centered: true,
    floating: true,
    layout: 'vbox',
    draggable: true,
    margins: '5 5 5 5',
    layoutConfig: {
      animate: true
    },
    items: [{
        xtype: 'textfield',
        fieldLabel: 'Employee',
        id: 'editev_trade',
        name: 'editev_trade',
        value: record.get("per_code"),
        activeUI: "default",
        ui: "default",
        componentCls: "x-field",
        width: 400,
        maxLength: "80",
        padding: "5px",
        //padding: "10px",
        labelAlign: 'right',
        labelPad: 1,
        readOnly: !0,
        currentAttribute: "protected",
        readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
      }, {
        xtype: 'uxdate',
        anchor: '100%',
        fieldLabel: 'date', //vBoilerList["editev_startdate"],
        id: 'editev_startdate',
        name: 'editev_startdate',
        value: record.get("acs_date"),
        activeUI: "default",
        ui: "default",
        labelAlign: 'right',
        labelPad: 1,
        padding: "5px",
        currentAttribute: "required",
        requiredCls: Ext.baseCSSPrefix + 'form-required-field'
      }, {
        xtype: 'uxnumber',
        fieldLabel: 'Hours', //vBoilerList["editev_hours"],
        id: 'editev_hours',
        name: 'editev_hours',
        vtype: 'number',
        activeUI: "default",
        ui: "default",
        componentCls: "x-field",
        labelAlign: 'right',
        labelPad: 1,
        value: EAM.utils.Format.number.toClientFormat(record.get('sched_hrs'), 'number'),
        padding: "5px",
        currentAttribute: "required",
        requiredCls: Ext.baseCSSPrefix + 'form-required-field'
      }
    ],
    buttons: [{
        text: 'Close',
        margin: '0 0 0 5',
        ui: 'popupfooter-small',
        iconAlign: "left",
        uftCls: "uft-id-close",
        handler: function () {
          EditPanel.close();
        }
      }, {
        text: 'Save',
        margin: '0 0 0 5',
        ui: 'popupfooter-small',
        iconAlign: "left",
        uftCls: "uft-id-save",
        handler: function () {
          updateEv(EditPanel, record);

        }
      }
    ]
  });
  EditPanel.show();

}
function updateEv(a, b) {

  var vFieldMissing = false;

  if (Ext.isEmpty(Ext.getCmp("editev_startdate").rawDate)) {
    Ext.getCmp('editev_startdate').markInvalid(EAM.Lang.getMessage('MSG_ERR_FIELD_REQUIRED'));
    vFieldMissing = true;
  }
  if (Ext.isEmpty(Ext.getCmp("editev_hours").value)) {
    Ext.getCmp('editev_hours').markInvalid(EAM.Lang.getMessage('MSG_ERR_FIELD_REQUIRED'));
    vFieldMissing = true;
  }
  if (vFieldMissing) {
    return false;
  }

  var vRecordToSCh = EAM.Ajax.request({
    url: "WSJOBS.SCH",
    params: {
      SYSTEM_FUNCTION_NAME: "WSJOBS",
      USER_FUNCTION_NAME: "WSJOBS",
      CURRENT_TAB_NAME: 'SCH',
      projectCodenum: Ext.getCmp("cust_sch_wo").getValue(),
      organization: Ext.getCmp('cust_sched_emp').organization,
      acscode: b.get('id'),
      acsactivity: Ext.getCmp("cust_sch_act").getValue(),
    }
  }).responseData.pageData.values;

  for (var k in vRecordToSCh) {
    if (Ext.isObject(vRecordToSCh[k])) {
      vRecordToSCh[k] = vRecordToSCh[k].selected
    }
  }

  vRecordToSCh.pagemode = "view";
  vRecordToSCh.conflict_type = "none";
  vRecordToSCh.ignore_conflict = true;
  vRecordToSCh.acssched = Ext.Date.format(new Date(Ext.getCmp("editev_startdate").rawDate), 'm/d/Y')
    vRecordToSCh.acshours = parseFloat(EAM.utils.Format.number.toStandardFormat(Ext.getCmp("editev_hours").value, "number"));
  var vStatusAcsUpd = EAM.Ajax.request({
    url: "WSJOBS.SCH?pageaction=SAVE",
    messagingOptions: {
      deferConfirm: !0,
      deferWarning: !0,
      deferError: !0
    },
    params: Ext.merge(vRecordToSCh, {
      SYSTEM_FUNCTION_NAME: "WSJOBS",
      USER_FUNCTION_NAME: "WSJOBS",
      CURRENT_TAB_NAME: "SCH",
      CHECK_CF_CHANGEFLAG: true,
      can_update: true,
      pagemode: "view"
    })
  });
  var vStmtMsg = "";
  if (vStatusAcsUpd.success) {
    var vGridSch = EAM.Ajax.request({
      url: "GRIDDATA",
      params: {
        SYSTEM_FUNCTION_NAME: "BULEPS",
        USER_FUNCTION_NAME: "BULEPS",
        LOV_ALIAS_NAME_1: "parameter.wo",
        LOV_ALIAS_TYPE_1: "text",
        LOV_ALIAS_VALUE_1: Ext.getCmp("cust_sch_wo").getValue(),
        LOV_ALIAS_NAME_2: "parameter.activity",
        LOV_ALIAS_TYPE_2: "text",
        LOV_ALIAS_VALUE_2: Ext.getCmp("cust_sch_act").getValue()
      }
    });
    Ext.getStore("cust_Grid_EmployeesSched").flushLoad()
    Ext.getStore("cust_Grid_EmployeesSched").removeAll()
    var vModeRecortPresent = '-'
      var vCURRENTCURSORPOSITION = 0;
    if (!Ext.isEmpty(vGridSch) && EAM.Utils.propertyExists(vGridSch, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
      if (vGridSch.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
        var vG = vGridSch.responseData.pageData.grid.GRIDRESULT.GRID
          vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
          vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
          Ext.getStore('cust_Grid_Employees').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
          Ext.getStore('cust_Grid_Employees').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
          Ext.getStore('cust_Grid_Employees').gridMetaData = vG.METADATA

          vG.DATA.forEach(function (rec) {
            vReuseChk = false;
            if (rec.reuse_period == "+") {
              vReuseChk = true;
            } else {
              vReuseChk = false;
            }

            Ext.getStore('cust_Grid_EmployeesSched').add(new Ext.data.Record({
                id: rec.acs_code,
                per_code: rec.per_code,
                per_desc: rec.per_desc,
                sched_hrs: rec.acs_hours,
                acs_date: rec.acs_sched
              }));
          })

      }
      Ext.getStore('cust_Grid_EmployeesSched').totalCount = vGridSch.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
    }

    // Afficher un message aprÃ¨s le traitement
    vStmtMsg += '<div style="background-color: green; color: white; padding: 5px; margin-bottom: 5px;">' + b.get('per_code') + ' assigned successfully</div>';
    Ext.Msg.alert('schedule process', vStmtMsg);
    a.close();
  } else {
    if (EAM.Utils.propertyExists(vStatusAcsUpd, 'responseData.pageData.messages')) {
      vStmtMsg += '<div style="background-color: red; color: white; padding: 5px; margin-bottom: 5px;">' + vStatusAcsUpd.responseData.pageData.messages[0].msg + '</div>';
    }
    Ext.Msg.alert('schedule process', vStmtMsg);
  }

}
function schedule_removerecord(a, b) {
  EAM.Messaging.showQuestion({
    msg: "Do you confirm?",
    buttons: EAM.MsgBox.YESNO,
    fn: function (c) {
      if (c === 'yes') {
        var vStmtMsg = "";
        var vDeleteWOASc = EAM.Ajax.request({
          url: "WSJOBS.SCH?pageaction=DELETE",
          messagingOptions: {
            deferConfirm: !0,
            deferWarning: !0,
            deferError: !0
          },
          params: {
            SYSTEM_FUNCTION_NAME: "WSJOBS",
            USER_FUNCTION_NAME: "WSJOBS",
            CURRENT_TAB_NAME: "SCH",
            projectCodenum: Ext.getCmp("cust_sch_wo").getValue(),
            organization: Ext.getCmp('cust_sched_emp').organization,
            acscode: a.get('id'),
            acsactivity: Ext.getCmp("cust_sch_act").getValue(),
          }
        });
        if (vDeleteWOASc.success) {
          vStmtMsg += '<div style="background-color: green; color: white; padding: 5px; margin-bottom: 5px;">Schedule deleted succesfully</div>';
          Ext.Msg.alert('schedule process', vStmtMsg);
          var vGridSch = EAM.Ajax.request({
            url: "GRIDDATA",
            params: {
              SYSTEM_FUNCTION_NAME: "BULEPS",
              USER_FUNCTION_NAME: "BULEPS",
              LOV_ALIAS_NAME_1: "parameter.wo",
              LOV_ALIAS_TYPE_1: "text",
              LOV_ALIAS_VALUE_1: Ext.getCmp("cust_sch_wo").getValue(),
              LOV_ALIAS_NAME_2: "parameter.activity",
              LOV_ALIAS_TYPE_2: "text",
              LOV_ALIAS_VALUE_2: Ext.getCmp("cust_sch_act").getValue(),
              LOV_ALIAS_NAME_3: "parameter.date",
              LOV_ALIAS_TYPE_3: "text",
              LOV_ALIAS_VALUE_3: Ext.Date.format(new Date(Ext.getCmp("cust_date_deb_2").getValue()), 'm/d/Y')
            }
          });
          Ext.getStore("cust_Grid_EmployeesSched").flushLoad()
          Ext.getStore("cust_Grid_EmployeesSched").removeAll()
          var vModeRecortPresent = '-'
            var vCURRENTCURSORPOSITION = 0;
          if (!Ext.isEmpty(vGridSch) && EAM.Utils.propertyExists(vGridSch, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
            if (vGridSch.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
              var vG = vGridSch.responseData.pageData.grid.GRIDRESULT.GRID
                vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
                vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
                Ext.getStore('cust_Grid_EmployeesSched').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
                Ext.getStore('cust_Grid_EmployeesSched').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
                Ext.getStore('cust_Grid_EmployeesSched').gridMetaData = vG.METADATA

                vG.DATA.forEach(function (rec) {
                  vReuseChk = false;
                  if (rec.reuse_period == "+") {
                    vReuseChk = true;
                  } else {
                    vReuseChk = false;
                  }

                  Ext.getStore('cust_Grid_EmployeesSched').add(new Ext.data.Record({
                      id: rec.acs_code,
                      per_code: rec.per_code,
                      per_desc: rec.per_desc,
                      sched_hrs: rec.acs_hours,
                      acs_date: rec.acs_sched
                    }));
                })

            }
            Ext.getStore('cust_Grid_EmployeesSched').totalCount = vGridSch.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
          }
        } else {
          if (EAM.Utils.propertyExists(vDeleteWOASc, 'responseData.pageData.messages')) {
            vStmtMsg += '<div style="background-color: red; color: white; padding: 5px; margin-bottom: 5px;">' + vDeleteWOASc.responseData.pageData.messages[0].msg + '</div>';
          }
          Ext.Msg.alert('schedule process', vStmtMsg);
        }
      }
    }
  });

}
function schedule_employee(a, b, c, d, e, f, g) {

  var vLastRow = 0;

  var vWO = a,
  vAct = b,
  dDate = new Date(Ext.Date.format(c, 'm/d/Y'));
  //dDate = new Date()
  var vGrid = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      SYSTEM_FUNCTION_NAME: "BULEMP",
      USER_FUNCTION_NAME: "BULEMP"
      /*,
      GRID_TYPE: "LOV",
      REQUEST_TYPE: "LOV.HEAD_DATA.STORED",
      //usagetype: "lov"*/
    ,
      LOV_ALIAS_NAME_1: "parameter.date",
      LOV_ALIAS_TYPE_1: "text",
      LOV_ALIAS_VALUE_1: Ext.Date.format(dDate, 'm/d/Y'),
      LOV_ALIAS_NAME_2: "param.org",
      LOV_ALIAS_TYPE_2: "text",
      LOV_ALIAS_VALUE_2: d
    }
  });

  var vGridSch = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      SYSTEM_FUNCTION_NAME: "BULEPS",
      USER_FUNCTION_NAME: "BULEPS"
      /*,
      GRID_TYPE: "LOV",
      REQUEST_TYPE: "LOV.HEAD_DATA.STORED",
      //usagetype: "lov"*/
    ,
      LOV_ALIAS_NAME_1: "parameter.wo",
      LOV_ALIAS_TYPE_1: "text",
      LOV_ALIAS_VALUE_1: vWO,
      LOV_ALIAS_NAME_2: "parameter.activity",
      LOV_ALIAS_TYPE_2: "text",
      LOV_ALIAS_VALUE_2: vAct,
      LOV_ALIAS_NAME_3: "parameter.date",
      LOV_ALIAS_TYPE_3: "text",
      LOV_ALIAS_VALUE_3: Ext.Date.format(dDate, 'm/d/Y')
    }
  });

  if (EAM.Utils.propertyExists(vGrid, "responseData.pageData.grid.GRIDRESULT.GRID.DATA")) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      //vLastRow = parseInt(vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA[0].RECORDS)
    }

  }

  if (Ext.getCmp("cust_Grid_Employees")) {
    Ext.getCmp("cust_Grid_Employees").destroy();
  }
  var vFields = []
  var vPrefactStore = Ext.create('Ext.data.Store', {
    id: 'cust_Grid_Employees',
    fields: vFields,
    autoLoad: true,
    autoSync: true,
    pageSize: 200,
    listeners: {
      sort: function (a, b) {
        console.log("sortstore");
        var v = Ext.getStore('cust_Grid_Employees')
          if (v) {
            v.proxy.data = [];
            for (i = 0; i < v.data.items.length; i++) {
              v.proxy.data.push(v.data.items[i].data)
            }
          }
      },
      storechange: function (a, c, d, e) {
        console.log("storechange")
      },
      change: function (a, c, d, e) {
        console.log("storechange2")
      }
    },
    proxy: {
      type: 'memory',
      enablePaging: true,
      reader: {
        type: 'json',
        rootProperty: 'data',
        totalProperty: 'total'
      }
    }
  });

  Ext.getStore("cust_Grid_Employees").flushLoad()
  Ext.getStore("cust_Grid_Employees").removeAll()
  var vModeRecortPresent = '-'
    var vCURRENTCURSORPOSITION = 0;
  if (!Ext.isEmpty(vGrid) && EAM.Utils.propertyExists(vGrid, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vG = vGrid.responseData.pageData.grid.GRIDRESULT.GRID
        vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
        vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_Employees').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
        Ext.getStore('cust_Grid_Employees').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_Employees').gridMetaData = vG.METADATA

        vG.DATA.forEach(function (rec) {
          vReuseChk = false;
          if (rec.reuse_period == "+") {
            vReuseChk = true;
          } else {
            vReuseChk = false;
          }

          Ext.getStore('cust_Grid_Employees').add(new Ext.data.Record({
              id: rec.id,
              per_code: rec.per_code,
              per_desc: rec.per_desc,
              per_org: rec.per_org,
              per_trade: rec.per_trade,
              per_mrc: rec.per_mrc,
              avail_hrs: rec.avail_hrs,
              sched_hrs: rec.sched_hrs,
              to_sched_hrs: 0
            }));
        })

    }
    Ext.getStore('cust_Grid_Employees').totalCount = vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
  }

  if (Ext.getStore("cust_Grid_EmployeesSched")) {
    Ext.getStore("cust_Grid_EmployeesSched").destroy();
  }
  var vFields = []
  var cust_Grid_EmployeesSched = Ext.create('Ext.data.Store', {
    id: 'cust_Grid_EmployeesSched',
    fields: vFields,
    autoLoad: true,
    autoSync: true,
    pageSize: 200,
    listeners: {
      sort: function (a, b) {
        console.log("sortstore");
        var v = Ext.getStore('cust_Grid_EmployeesSched')
          if (v) {
            v.proxy.data = [];
            for (i = 0; i < v.data.items.length; i++) {
              v.proxy.data.push(v.data.items[i].data)
            }
          }
      },
      storechange: function (a, c, d, e) {
        console.log("storechange")
      },
      change: function (a, c, d, e) {
        console.log("storechange2")
      }
    },
    proxy: {
      type: 'memory',
      enablePaging: true,
      reader: {
        type: 'json',
        rootProperty: 'data',
        totalProperty: 'total'
      }
    }
  });

  Ext.getStore("cust_Grid_EmployeesSched").flushLoad()
  Ext.getStore("cust_Grid_EmployeesSched").removeAll()
  var vModeRecortPresent = '-'
    var vCURRENTCURSORPOSITION = 0;
  if (!Ext.isEmpty(vGridSch) && EAM.Utils.propertyExists(vGridSch, 'responseData.pageData.grid.GRIDRESULT.GRID.DATA')) {
    if (vGridSch.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
      var vG = vGridSch.responseData.pageData.grid.GRIDRESULT.GRID
        vModeRecortPresent = vG.METADATA.MORERECORDPRESENT
        vCURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_Employees').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
        Ext.getStore('cust_Grid_Employees').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
        Ext.getStore('cust_Grid_Employees').gridMetaData = vG.METADATA

        vG.DATA.forEach(function (rec) {
          vReuseChk = false;
          if (rec.reuse_period == "+") {
            vReuseChk = true;
          } else {
            vReuseChk = false;
          }

          Ext.getStore('cust_Grid_EmployeesSched').add(new Ext.data.Record({
              id: rec.acs_code,
              per_code: rec.per_code,
              per_desc: rec.per_desc,
              sched_hrs: rec.acs_hours,
              acs_date: rec.acs_sched
            }));
        })

    }
    Ext.getStore('cust_Grid_EmployeesSched').totalCount = vGrid.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length;
  }

  var vActivityStore = Ext.create('Ext.data.Store', {
    id: 'gantt.woactivity.store',
    fields: ['code', 'description'],
    data: [{
        "code": vAct,
        "description": 'Activty 10'
      }
    ]
  });

  var panel = new Ext.Panel({
    title: 'Schedule employee', //gantt.locale.labels.adj_capac_formtitle,
    frame: true,
    width: 800,
    organization: d,
    id: 'cust_sched_emp',
    height: 800,
    modal: true,
    closable: true,
    centered: true,
    floating: true,
    closable: false,
    resizable: true,
    layout: {
      type: 'vbox',
      align: 'stretch' // Aligne les Ã©lÃ©ments enfants pour remplir la largeur du conteneur
    },
    draggable: true,
    margins: '5 5 5 5',
    layoutConfig: {
      animate: true
    },
    items: [{
        //title: 'Filtre',
        id: "cust_sched_emp_f",
        region: 'north',
        xtype: 'panel',
        split: true,
        collapsible: false,
        width: '100%',
        flex: 0.15,
        layout: 'column',
        defaults: {
          //columnWidth: 0.33
        },
        items: [{
            id: "cust_sched_emp_f_1",
            scrollable: true,
            //region: 'north',   // position for region
            xtype: 'panel',
            height: "50%",
            width: '100%',
            layout: 'column',
            split: true, // enable resizing
            margin: '0 5 5 5',
            items: [{
                name: 'cust_sch_wo',
                id: "cust_sch_wo",
                xtype: 'textfield',
                colspan: 1,
                rowspan: 1,
                fieldLabel: 'Work order', //gantt.locale.labels.adj_capac_supplier_org,
                maxLength: 15,
                value: vWO,
                upper: !0,
                hidden: false,
                padding: "10px",
                readOnly: !0,
                readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
              }, , {
                name: 'cust_sch_act',
                id: "cust_sch_act",
                xtype: 'textfield',
                colspan: 1,
                rowspan: 1,
                fieldLabel: 'Activity', //gantt.locale.labels.adj_capac_supplier_org,
                maxLength: 15,
                value: vAct,
                upper: !0,
                hidden: false,
                padding: "10px",
                readOnly: !0,
                readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly"
              }

            ]
          }, {
            id: "cust_sched_emp_f_2",
            scrollable: true,
            //region: 'north',   // position for region
            xtype: 'panel',
            height: "50%",
            width: '100%',
            layout: 'column',
            defaults: {
              //columnWidth: 0.333
            },
            split: true, // enable resizing
            margin: '0 5 5 5',
            items: [{
                xtype: 'uxdate',
                anchor: '100%',
                fieldLabel: 'Scehduled date',
                //fieldLabel: 'From',
                id: 'cust_date_deb_2',
                value: dDate,
                //format: "d/m/y",
                padding: "10px",
                currentAttribute: "required",
                requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                listeners: {
                  change: function (a, b, c) {
                    /*if(b===null){
                    //Ext.getCmp("cust_date_deb_2").setValue("")
                    }
                    if(b<Ext.getCmp("cust_date_deb_1").getValue()){
                    Ext.getCmp("cust_date_deb_1").setValue("")
                    }*/
                  }
                }
              }
            ]
          }

        ]
      }, {
        //title: 'Filtre',
        id: "cust_panel_1",
        region: 'center',
        xtype: 'panel',
        split: true,
        //collapsible: false,
        //scrollable:true,
        layout: "fit",
        width: '100%',
        flex: 0.50,
        padding: '10px'
      }, {
        //title: 'Filtre',
        id: "cust_panel_2",
        region: 'south',
        xtype: 'panel',
        split: true,
        //collapsible: false,
        //scrollable:true,
        layout: "fit",
        width: '100%',
        flex: 0.3,
        padding: '10px'
      }

    ],
    buttonAlign: 'center',
    buttons: [{
        text: 'Close',
        margin: '0 0 0 5',
        handler: function () {
          panel.close();
        },
        ui: 'popupfooter'
      }
    ]
  });

  var sFilterFields = Ext.create('Ext.data.Store', {
    id: 'gantt.empfilterfields.store',
    fields: ['code', 'description'],
    data: []
  });

  if (EAM.Utils.propertyExists(vGrid, "responseData.pageData.grid.GRIDRESULT.GRID.FIELDS")) {
    var vFieldsGrid = vGrid.responseData.pageData.grid.GRIDRESULT.GRID.FIELDS;
    vFieldsGrid.FIELD.forEach(function (rec) {
      sFilterFields.add(new Ext.data.Record({
          id: rec.name,
          code: rec.name,
          description: rec.label,
          type: rec.type
        }));
    });
  }
  sFilterFields.sort('description', 'ASC');

  var sFilterOperators = Ext.create('Ext.data.Store', {
    id: 'gantt.empfilterOperators.store',
    fields: ['code', 'description'],
    data: [{
        'code': 'like',
        'description': 'contains'
      }, {
        'code': '=',
        'description': 'equals'
      }, {
        'code': 'start',
        'description': 'Starts with'
      }
    ]
  });

  //var h = h = a.createFilterOperatorMenu(EAM.Utils.createValuesArray(a.language.filterOperators.standard));

  var vListofOp = [];

  function cust_getQuickFilterOperatorIconClass(b) {
    var a = '';
    switch (b) {
    case '=':
      a = 'fo_eq';
      break;
    case '!=':
      a = 'fo_neq';
      break;
    case 'CONTAINS':
      a = 'fo_con';
      break;
    case 'NOTCONTAINS':
      a = 'fo_dncon';
      break;
    case 'IS EMPTY':
      a = 'fo_ie';
      break;
    case 'NOT EMPTY':
      a = 'fo_ine';
      break;
    case 'BEGINS':
      a = 'fo_sw';
      break;
    case 'ENDS':
      a = 'fo_ew';
      break;
    case '<':
      a = 'fo_lt';
      break;
    case '>':
      a = 'fo_gt';
      break;
    case '<=':
      a = 'fo_lte';
      break;
    case '>=':
      a = 'fo_gte';
      break;
    case 'IN':
      a = 'fo_in';
      break;
    case '-1':
      a = 'fo_chk';
      break;
    case '0':
      a = 'fo_nochk';
      break;
    case '':
      a = 'fo_eitherchk';
      break;
    }
    return a
  }

  var vListOfOperators = []
  vListOfOperators.push({
    value: 'CONTAINS',
    display: 'Containts'
  });
  vListOfOperators.push({
    value: 'NOTCONTAINS',
    display: 'Not contains'
  });
  vListOfOperators.push({
    value: 'IS EMPTY',
    display: 'Is empty'
  });
  vListOfOperators.push({
    value: 'NOT EMPTY',
    display: 'Not empty'
  });
  vListOfOperators.push({
    value: '=',
    display: 'Equals'
  });
  vListOfOperators.push({
    value: '!=',
    display: 'Not equals'
  });
  vListOfOperators.push({
    value: 'BEGINS',
    display: 'Starts with'
  });
  vListOfOperators.push({
    value: 'ENDS',
    display: 'Ends with'
  });

  var vListOfOp1 = []
  for (var d = 0, g = vListOfOperators.length; d < g; d++) {
    c = vListOfOperators[d];
    a = c.value;

    vListOfOp1.push({
      iconCls: cust_getQuickFilterOperatorIconClass(a),
      text: c.display,
      value: a,
      listeners: {
        click: function (a) {
          var b = Ext.getCmp("btnFilterOperator");
          b.setIconCls(a.iconCls);
          b.value = a.value;
          b.setTooltip(a.text)
        },
        scope: Ext.getCmp("btnFilterOperator")
      }
    })
  }

  var vGridPresta = Ext.create('Ext.grid.Panel', {
    id: "cust_Grid_ListOfEmployees",
    xtype: 'editablegrid',
    cust_object: 'shutdown_planning',
    // plugins: [cellEditing]  ,
    store: Ext.getStore('cust_Grid_Employees'), //Ext.data.StoreManager.lookup('cust.prefact.values'),
    autoWidth: false,
    titleBar: {
      hidden: false
    },
    header: true,
    //autoHeight:false,
    //height:some-height,
    editable: !1,
    //pluginType: 'EAM.ux.grid.plugin.CellEditing',
    multiSelect: false,
    multiColumnSort: true,
    scrollable: true,
    viewConfig: {
      preserveScrollOnRefresh: false
    },
    tools: [{
        iconCls: 'x-tool-tool-el x-tool-img x-tool-close',
        tooltip: 'Cancel',
        // left: "50%",
        callback: function () {
          vGridPresta.getSelectionModel().deselectAll();
        }
      }, {
        iconCls: 'x-tool-tool-el x-tool-img x-tool-approve',
        tooltip: 'Schedule',
        // left: "50%",
        callback: function () {
          var selectedRecords = vGridPresta.getSelectionModel().getSelection();
          schedule_processSelectedData(selectedRecords);
        }
      }
    ],
    dockedItems: [{
        itemId: 'cust_dockitems1',
        xtype: 'toolbar',
        dock: 'top',
        height: 40,
        split: true,
        layout: {
          type: 'vbox',
          align: 'stretch',
          split: true
        },
        items: [{
            xtype: 'container',
            layout: {
              type: 'vbox',
              align: 'stretch'
            },

            itemId: 'main_cust_container_emp_filter1',
            id: 'main_cust_container_emp_filter1',
            countOject: 1,
            cust_object: "shutdown_planning",
            items: [{
                xtype: 'container',
                layout: {
                  type: 'hbox',
                  align: 'stretch'
                },

                itemId: 'cust_container_emp_filter1',
                id: 'cust_container_emp_filter1',
                countOject: 1,
                itemInCmpIdx: 1,
                cust_object: "shutdown_planning",
                items: [{
                    xtype: 'combobox',
                    store: sFilterFields,
                    queryMode: 'local',
                    displayField: 'description',
                    fieldLabel: "Filter",
                    valueField: 'code',
                    height: 30,
                    value: null, //vNewRecord.wspf_10_type_date,
                    id: "gridempfilter1",
                    margin: '5 5 5 5',
                    name: "gridempfilter1",
                    padding: "10px",
                    allowBlank: true,
                    //currentAttribute :"required",
                    //requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                    listeners: {
                      change: function () {

                        if (Ext.isEmpty(arguments[1])) {
                          return;
                        }

                        var vListOfOperators = []
                        var combo = arguments[0],

                        fieldContainer = Ext.getCmp("gridempfilter2_fldcont");
                        fieldContainer.removeAll();
                        var curSelect = arguments[0].selection.data;

                        var dflticonCls = 'fo_con',
                        dfltValue = 'CONTAINS',
                        dflTooltip = "Contains"

                          if (["VARCHAR", "MIXVARCHAR", "LONG"].indexOf(curSelect.type) >= 0) {
                            dflticonCls = 'fo_con'
                              dfltValue = 'CONTAINS'
                              dflTooltip = "Contains"
                              vListOfOperators.push({
                                value: 'CONTAINS',
                                display: 'Containts'
                              });
                            vListOfOperators.push({
                              value: 'NOTCONTAINS',
                              display: 'Not contains'
                            });
                            vListOfOperators.push({
                              value: 'IS EMPTY',
                              display: 'Is empty'
                            });
                            vListOfOperators.push({
                              value: 'NOT EMPTY',
                              display: 'Not empty'
                            });
                            vListOfOperators.push({
                              value: '=',
                              display: 'Equals'
                            });
                            vListOfOperators.push({
                              value: '!=',
                              display: 'Not equals'
                            });
                            vListOfOperators.push({
                              value: 'BEGINS',
                              display: 'Starts with'
                            });
                            vListOfOperators.push({
                              value: 'ENDS',
                              display: 'Ends with'
                            });

                            fieldContainer.add({
                              xtype: 'textfield',
                              id: "gridempfilter2",
                              name: "gridempfilter2",
                              margin: '5 5 5 5',
                              height: 30,
                              fieldLabel: null, // 'Name',
                              labelAlign: 'right',
                              listeners: {
                                change: function (field, newValue) {}
                              },
                              cust_object: "shutdown_planning"
                            });

                          }
                          if (["NUMBER", "DECIMAL", "DURATION", "TSMIDNIGHT", "CURRENCY"].indexOf(curSelect.type) >= 0) {
                            dflticonCls = 'fo_eq'
                              dfltValue = '='
                              dflTooltip = "Equals"
                              vListOfOperators.push({
                                value: '=',
                                display: 'Equals'
                              });
                            vListOfOperators.push({
                              value: '!=',
                              display: 'Not equals'
                            });
                            vListOfOperators.push({
                              value: '>',
                              display: 'Geater'
                            });
                            vListOfOperators.push({
                              value: '>=',
                              display: 'Greater or equals'
                            });
                            vListOfOperators.push({
                              value: '<',
                              display: 'Lower'
                            });
                            vListOfOperators.push({
                              value: '<=',
                              display: 'Lower or equals'
                            });
                            fieldContainer.add({
                              xtype: 'uxnumber',
                              id: "gridempfilter2",
                              name: "gridempfilter2",
                              margin: '5 5 5 5',
                              height: 30,
                              fieldLabel: null, // 'Name',
                              labelAlign: 'right',
                              vtype: "number",
                              numberFormat: "24,6",
                              value: "",
                              cust_object: "shutdown_planning"
                            });
                          }

                          if (["DATE", "DATETIME"].indexOf(curSelect.type) >= 0) {
                            dflticonCls = 'fo_eq'
                              dfltValue = '='
                              dflTooltip = "Equals"
                              vListOfOperators.push({
                                value: '=',
                                display: 'Equals'
                              });
                            vListOfOperators.push({
                              value: '!=',
                              display: 'Not equals'
                            });
                            vListOfOperators.push({
                              value: '>',
                              display: 'Geater'
                            });
                            vListOfOperators.push({
                              value: '>=',
                              display: 'Greater or equals'
                            });
                            vListOfOperators.push({
                              value: '<',
                              display: 'Lower'
                            });
                            vListOfOperators.push({
                              value: '<=',
                              display: 'Lower or equals'
                            });
                            fieldContainer.add({
                              xtype: 'uxdate',
                              id: "gridempfilter2",
                              name: "gridempfilter2",
                              margin: '5 5 5 5',
                              height: 30,
                              fieldLabel: null, // 'Name',
                              labelAlign: 'right',
                              vtype: "number",
                              numberFormat: "24,6",
                              value: "",
                              cust_object: "shutdown_planning"
                            });
                          }

                          if (["CHKBOOLEAN"].indexOf(curSelect.type) >= 0) {

                            dflticonCls = 'fo_eitherchk'
                              dfltValue = ''
                              dflTooltip = "Either"
                              vListOfOperators.push({
                                value: '-1',
                                display: 'Checked'
                              });
                            vListOfOperators.push({
                              value: '0',
                              display: 'Unchecked'
                            });
                            vListOfOperators.push({
                              value: '',
                              display: 'Either'
                            });
                            fieldContainer.add({
                              xtype: 'uxdate',
                              id: "gridempfilter2",
                              name: "gridempfilter2",
                              margin: '5 5 5 5',
                              height: 30,
                              hidden: true,
                              fieldLabel: null, // 'Name',
                              labelAlign: 'right',
                              vtype: "number",
                              numberFormat: "24,6",
                              value: "",
                              cust_object: "shutdown_planning"
                            });
                          }

                          var e = []
                          for (var d = 0, g = vListOfOperators.length; d < g; d++) {
                            c = vListOfOperators[d];
                            a = c.value;

                            e.push({
                              iconCls: cust_getQuickFilterOperatorIconClass(a),
                              text: c.display,
                              value: a,
                              listeners: {
                                click: function (a) {
                                  var b = Ext.getCmp("btnFilterOperator");
                                  b.setIconCls(a.iconCls);
                                  b.value = a.value;
                                  b.setTooltip(a.text)
                                },
                                scope: Ext.getCmp("btnFilterOperator")
                              }
                            })
                          }
                          Ext.getCmp("gridempfilter2").setValue(null)
                          Ext.getCmp('btnFilterOperator').menu.removeAll()
                          Ext.getCmp('btnFilterOperator').menu.add(e)
                          Ext.getCmp('btnFilterOperator').setIconCls(dflticonCls);
                        Ext.getCmp('btnFilterOperator').value = dfltValue;
                        Ext.getCmp('btnFilterOperator').setTooltip(dflTooltip)

                      }
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'button',
                    ui: 'tertiary',
                    iconCls: 'fo_con', //a.defaultOpIconClass,
                    value: 'CONTAINS',
                    height: 30,
                    itemId: 'btnFilterOperator',
                    name: 'btnFilterOperator',
                    id: 'btnFilterOperator',
                    margin: '5 5 5 5',
                    tooltip: 'Contains',
                    menu: Ext.create('Ext.menu.Menu', {
                      items: vListOfOp1,
                      cust_object: 'shutdown_planning',
                      shadow: !1,
                      itemId: 'filterOperatorMenuCustEmp'
                    }),
                    tabIndex: 40,
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'container',
                    itemId: 'gridempfilter2_fldcont',
                    id: 'gridempfilter2_fldcont', // Identifiant pour trouver le conteneur
                    layout: 'anchor',
                    defaults: {
                      anchor: '100%'
                    },
                    items: [{
                        xtype: 'textfield',
                        id: "gridempfilter2",
                        name: "gridempfilter2",
                        margin: '5 5 5 5',
                        height: 30,
                        fieldLabel: null, // 'Name',
                        labelAlign: 'right',
                        listeners: {
                          change: function (field, newValue) {}
                        },
                        cust_object: "shutdown_planning"
                      }
                    ],
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'button',
                    text: "Run",
                    margin: '5 0 0 5',
                    id: "gridempfilter3",
                    name: "gridempfilter3",
                    margin: '5 5 5 5',
                    height: 30,
                    class: "x-btn-inner x-btn-inner-tertiary-small",
                    handler: function (e) {
                      reload_emplgrid();
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'button',
                    text: "+",
                    tooltip: "Add new line",
                    margin: '5 0 0 5',
                    id: "gridempfilter4",
                    name: "gridempfilter4",
                    margin: '5 5 5 5',
                    height: 30,
                    class: "x-btn-inner x-btn-inner-tertiary-small",
                    handler: function (e) {
                      var vGrid = Ext.getCmp("cust_Grid_ListOfEmployees")
                        var vDock = vGrid.getDockedComponent('cust_dockitems1')
                        vDock.setHeight(vDock.getHeight() + 45)
                        var ntotalCount = parseFloat(Ext.getCmp('main_cust_container_emp_filter1').countOject);
                      var nNewId = ntotalCount + 1;

                      var vListOfOp = []
                      for (var d = 0, g = vListOfOperators.length; d < g; d++) {
                        c = vListOfOperators[d];
                        a = c.value;

                        vListOfOp.push({
                          iconCls: cust_getQuickFilterOperatorIconClass(a),
                          text: c.display,
                          value: a,
                          listeners: {
                            click: function (a) {
                              var b = Ext.getCmp("btnFilterOperator" + '_' + nNewId);
                              b.setIconCls(a.iconCls);
                              b.value = a.value;
                              b.setTooltip(a.text)
                            },
                            scope: Ext.getCmp("btnFilterOperator" + '_' + nNewId)
                          }
                        })
                      }

                      var vNewObj = [{
                          xtype: 'container',
                          layout: {
                            type: 'hbox',
                            align: 'stretch'
                          },
                          itemId: 'cust_container_emp_filter1' + '_' + nNewId,
                          id: 'cust_container_emp_filter1' + '_' + nNewId,
                          itemInCmpIdx: nNewId,
                          cust_object: "shutdown_planning",
                          items: [{
                              xtype: 'combobox',
                              store: sFilterFields,
                              queryMode: 'local',
                              displayField: 'description',
                              fieldLabel: "Filter",
                              valueField: 'code',
                              height: 30,
                              value: null, //vNewRecord.wspf_10_type_date,
                              id: "gridempfilter1" + '_' + nNewId,
                              margin: '5 5 5 5',
                              name: "gridempfilter1" + '_' + nNewId,
                              padding: "10px",
                              allowBlank: true,
                              //currentAttribute :"required",
                              //requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                              listeners: {
                                change: function () {

                                  if (Ext.isEmpty(arguments[1])) {
                                    return;
                                  }
                                  var vListOfOperators = []
                                  var combo = arguments[0],

                                  fieldContainer = Ext.getCmp("gridempfilter2_fldcont" + '_' + nNewId);
                                  fieldContainer.removeAll();
                                  var curSelect = arguments[0].selection.data;

                                  var dflticonCls = 'fo_con',
                                  dfltValue = 'CONTAINS',
                                  dflTooltip = "Contains"
                                    if (["VARCHAR", "MIXVARCHAR", "LONG"].indexOf(curSelect.type) >= 0) {
                                      dflticonCls = 'fo_con'
                                        dfltValue = 'CONTAINS'
                                        dflTooltip = "Contains"
                                        vListOfOperators.push({
                                          value: 'CONTAINS',
                                          display: 'Containts'
                                        });
                                      vListOfOperators.push({
                                        value: 'NOTCONTAINS',
                                        display: 'Not contains'
                                      });
                                      vListOfOperators.push({
                                        value: 'IS EMPTY',
                                        display: 'Is empty'
                                      });
                                      vListOfOperators.push({
                                        value: 'NOT EMPTY',
                                        display: 'Not empty'
                                      });
                                      vListOfOperators.push({
                                        value: '=',
                                        display: 'Equals'
                                      });
                                      vListOfOperators.push({
                                        value: '!=',
                                        display: 'Not equals'
                                      });
                                      vListOfOperators.push({
                                        value: 'BEGINS',
                                        display: 'Starts with'
                                      });
                                      vListOfOperators.push({
                                        value: 'ENDS',
                                        display: 'Ends with'
                                      });

                                      fieldContainer.add({
                                        xtype: 'textfield',
                                        id: "gridempfilter2" + '_' + nNewId,
                                        name: "gridempfilter2" + '_' + nNewId,
                                        margin: '5 5 5 5',
                                        height: 30,
                                        fieldLabel: null, // 'Name',
                                        labelAlign: 'right',
                                        listeners: {
                                          change: function (field, newValue) {}
                                        },
                                        cust_object: "shutdown_planning"
                                      });

                                    }
                                    if (["NUMBER", "DECIMAL", "DURATION", "TSMIDNIGHT", "CURRENCY"].indexOf(curSelect.type) >= 0) {
                                      dflticonCls = 'fo_eq'
                                        dfltValue = '='
                                        dflTooltip = "Equals"
                                        vListOfOperators.push({
                                          value: '=',
                                          display: 'Equals'
                                        });
                                      vListOfOperators.push({
                                        value: '!=',
                                        display: 'Not equals'
                                      });
                                      vListOfOperators.push({
                                        value: '>',
                                        display: 'Geater'
                                      });
                                      vListOfOperators.push({
                                        value: '>=',
                                        display: 'Greater or equals'
                                      });
                                      vListOfOperators.push({
                                        value: '<',
                                        display: 'Lower'
                                      });
                                      vListOfOperators.push({
                                        value: '<=',
                                        display: 'Lower or equals'
                                      });
                                      fieldContainer.add({
                                        xtype: 'uxnumber',
                                        id: "gridempfilter2" + '_' + nNewId,
                                        name: "gridempfilter2" + '_' + nNewId,
                                        margin: '5 5 5 5',
                                        height: 30,
                                        fieldLabel: null, // 'Name',
                                        labelAlign: 'right',
                                        vtype: "number",
                                        numberFormat: "24,6",
                                        value: "",
                                        cust_object: "shutdown_planning"
                                      });
                                    }

                                    if (["DATE", "DATETIME"].indexOf(curSelect.type) >= 0) {
                                      dflticonCls = 'fo_eq'
                                        dfltValue = '='
                                        dflTooltip = "Equals"
                                        vListOfOperators.push({
                                          value: '=',
                                          display: 'Equals'
                                        });
                                      vListOfOperators.push({
                                        value: '!=',
                                        display: 'Not equals'
                                      });
                                      vListOfOperators.push({
                                        value: '>',
                                        display: 'Geater'
                                      });
                                      vListOfOperators.push({
                                        value: '>=',
                                        display: 'Greater or equals'
                                      });
                                      vListOfOperators.push({
                                        value: '<',
                                        display: 'Lower'
                                      });
                                      vListOfOperators.push({
                                        value: '<=',
                                        display: 'Lower or equals'
                                      });
                                      fieldContainer.add({
                                        xtype: 'uxdate',
                                        id: "gridempfilter2" + '_' + nNewId,
                                        name: "gridempfilter2" + '_' + nNewId,
                                        margin: '5 5 5 5',
                                        height: 30,
                                        fieldLabel: null, // 'Name',
                                        labelAlign: 'right',
                                        vtype: "number",
                                        numberFormat: "24,6",
                                        value: "",
                                        cust_object: "shutdown_planning"
                                      });
                                    }

                                    if (["CHKBOOLEAN"].indexOf(curSelect.type) >= 0) {

                                      dflticonCls = 'fo_eitherchk'
                                        dfltValue = ''
                                        dflTooltip = "Either"
                                        vListOfOperators.push({
                                          value: '-1',
                                          display: 'Checked'
                                        });
                                      vListOfOperators.push({
                                        value: '0',
                                        display: 'Unchecked'
                                      });
                                      vListOfOperators.push({
                                        value: '',
                                        display: 'Either'
                                      });
                                      fieldContainer.add({
                                        xtype: 'uxdate',
                                        id: "gridempfilter2" + '_' + nNewId,
                                        name: "gridempfilter2" + '_' + nNewId,
                                        margin: '5 5 5 5',
                                        height: 30,
                                        hidden: true,
                                        fieldLabel: null, // 'Name',
                                        labelAlign: 'right',
                                        vtype: "number",
                                        numberFormat: "24,6",
                                        value: "",
                                        cust_object: "shutdown_planning"
                                      });
                                    }

                                    var e = []
                                    for (var d = 0, g = vListOfOperators.length; d < g; d++) {
                                      c = vListOfOperators[d];
                                      a = c.value;

                                      e.push({
                                        iconCls: cust_getQuickFilterOperatorIconClass(a),
                                        text: c.display,
                                        value: a,
                                        listeners: {
                                          click: function (a) {
                                            var b = Ext.getCmp("btnFilterOperator" + '_' + nNewId);
                                            b.setIconCls(a.iconCls);
                                            b.value = a.value;
                                            b.setTooltip(a.text)
                                          },
                                          scope: Ext.getCmp("btnFilterOperator" + '_' + nNewId)
                                        }
                                      })
                                    }
                                    Ext.getCmp("gridempfilter2" + '_' + nNewId).setValue(null)
                                    Ext.getCmp('btnFilterOperator' + '_' + nNewId).menu.removeAll()
                                    Ext.getCmp('btnFilterOperator' + '_' + nNewId).menu.add(e)
                                    Ext.getCmp('btnFilterOperator' + '_' + nNewId).setIconCls(dflticonCls);
                                  Ext.getCmp('btnFilterOperator' + '_' + nNewId).value = dfltValue;
                                  Ext.getCmp('btnFilterOperator' + '_' + nNewId).setTooltip(dflTooltip)

                                }
                              },
                              cust_object: "shutdown_planning"
                            }, {
                              xtype: 'button',
                              ui: 'tertiary',
                              iconCls: 'fo_con', //a.defaultOpIconClass,
                              value: 'CONTAINS',
                              height: 30,
                              itemId: 'btnFilterOperator' + '_' + nNewId,
                              name: 'btnFilterOperator' + '_' + nNewId,
                              id: 'btnFilterOperator' + '_' + nNewId,
                              margin: '5 5 5 5',
                              tooltip: 'Contains',
                              menu: Ext.create('Ext.menu.Menu', {
                                items: vListOfOp,
                                cust_object: 'shutdown_planning',
                                shadow: !1,
                                itemId: 'filterOperatorMenuCustEmp' + '_' + nNewId
                              }),
                              tabIndex: 40,
                              cust_object: "shutdown_planning"
                            }, {
                              xtype: 'container',
                              itemId: 'gridempfilter2_fldcont' + '_' + nNewId,
                              id: 'gridempfilter2_fldcont' + '_' + nNewId,
                              layout: 'anchor',
                              defaults: {
                                anchor: '100%'
                              },
                              items: [{
                                  xtype: 'textfield',
                                  id: "gridempfilter2" + '_' + nNewId,
                                  name: "gridempfilter2" + '_' + nNewId,
                                  margin: '5 5 5 5',
                                  height: 30,
                                  fieldLabel: null, // 'Name',
                                  labelAlign: 'right',
                                  listeners: {
                                    change: function (field, newValue) {}
                                  },
                                  cust_object: "shutdown_planning"
                                }
                              ],
                              cust_object: "shutdown_planning"
                            }, {
                              xtype: 'button',
                              text: "-",
                              tooltip: "remove line",
                              margin: '5 0 0 5',
                              id: "gridempfilter4" + '_' + nNewId,
                              name: "gridempfilter4" + '_' + nNewId,
                              margin: '5 5 5 5',
                              height: 30,
                              class: "x-btn-inner x-btn-inner-tertiary-small",
                              handler: function (e) {
                                Ext.getCmp("main_cust_container_emp_filter1").remove(Ext.getCmp("cust_container_emp_filter1" + '_' + nNewId))
                                Ext.getCmp('main_cust_container_emp_filter1').countOject = Ext.getCmp('main_cust_container_emp_filter1').countOject - 1;

                                var vGrid = Ext.getCmp("cust_Grid_ListOfEmployees")
                                  var vDock = vGrid.getDockedComponent('cust_dockitems1')
                                  vDock.setHeight(vDock.getHeight() - 45)
                              }
                            }

                          ]
                        }
                      ]
                      Ext.getCmp("main_cust_container_emp_filter1").add(vNewObj);
                      Ext.getCmp('main_cust_container_emp_filter1').countOject = nNewId;

                    },
                    cust_object: "shutdown_planning"
                  }
                ]

              }

            ]

          }

        ]

      }
    ],
    /*selModel: {
    type: 'checkboxmodel',
    flex : 15/100,
    mode: 'MULTI' // DÃ©finit le mode de sÃ©lection multiple
    },*/
    columns: [{
        header: Ext.getStore("gantt.empfilterfields.store").getById("per_code").data.description,
        dataIndex: 'per_code',
        flex: 15 / 100,
        hidden: false,
        renderer: function (value, metaData, record) {
          var vValue1 = parseFloat(record.get('avail_hrs')),
          vValue2 = parseFloat(record.get('sched_hrs')),
          vValue3 = parseFloat(record.get('to_sched_hrs')),
          vTotalValue = vValue2 + vValue3

            if (vValue1 >= vTotalValue) {
              metaData.style = "background-color:lightgreen;color:black;";
            } else {
              metaData.style = "background-color:red;color:white;";
            }
            return value;
        }

      }, {
        header: Ext.getStore("gantt.empfilterfields.store").getById("per_desc").data.description,
        dataIndex: 'per_desc',
        flex: 40 / 100,
        hidden: false,
        renderer: function (value, metaData, record) {
          var vValue1 = parseFloat(record.get('avail_hrs')),
          vValue2 = parseFloat(record.get('sched_hrs')),
          vValue3 = parseFloat(record.get('to_sched_hrs')),
          vTotalValue = vValue2 + vValue3

            if (vValue1 >= vTotalValue) {
              metaData.style = "background-color:lightgreen;color:black;";
            } else {
              metaData.style = "background-color:red;color:white;";
            }
            return value;
        }
      }, {
        header: Ext.getStore("gantt.empfilterfields.store").getById("per_org").data.description,
        dataIndex: 'per_org',
        flex: 5 / 100,
        hidden: false,
        renderer: function (value, metaData, record) {
          var vValue1 = parseFloat(record.get('avail_hrs')),
          vValue2 = parseFloat(record.get('sched_hrs')),
          vValue3 = parseFloat(record.get('to_sched_hrs')),
          vTotalValue = vValue2 + vValue3

            if (vValue1 >= vTotalValue) {
              metaData.style = "background-color:lightgreen;color:black;";
            } else {
              metaData.style = "background-color:red;color:white;";
            }
            return value;
        }
      }, {
        header: Ext.getStore("gantt.empfilterfields.store").getById("per_mrc").data.description,
        dataIndex: 'per_mrc',
        flex: 15 / 100,
        hidden: false,
        renderer: function (value, metaData, record) {
          var vValue1 = parseFloat(record.get('avail_hrs')),
          vValue2 = parseFloat(record.get('sched_hrs')),
          vValue3 = parseFloat(record.get('to_sched_hrs')),
          vTotalValue = vValue2 + vValue3

            if (vValue1 >= vTotalValue) {
              metaData.style = "background-color:lightgreen;color:black;";
            } else {
              metaData.style = "background-color:red;color:white;";
            }
            return value;
        }

      }, {
        header: Ext.getStore("gantt.empfilterfields.store").getById("per_trade").data.description,
        dataIndex: 'per_trade',
        flex: 15 / 100,
        hidden: false,
        renderer: function (value, metaData, record) {
          var vValue1 = parseFloat(record.get('avail_hrs')),
          vValue2 = parseFloat(record.get('sched_hrs')),
          vValue3 = parseFloat(record.get('to_sched_hrs')),
          vTotalValue = vValue2 + vValue3

            if (vValue1 >= vTotalValue) {
              metaData.style = "background-color:lightgreen;color:black;";
            } else {
              metaData.style = "background-color:red;color:white;";
            }
            return value;
        }

      }, {
        text: Ext.getStore("gantt.empfilterfields.store").getById("avail_hrs").data.description,
        dataIndex: 'avail_hrs',
        value: 1,
        flex: 5 / 100,
        renderer: function (value, metaData, record) {
          var vValue1 = parseFloat(record.get('avail_hrs')),
          vValue2 = parseFloat(record.get('sched_hrs')),
          vValue3 = parseFloat(record.get('to_sched_hrs')),
          vTotalValue = vValue2 + vValue3

            if (vValue1 >= vTotalValue) {
              metaData.style = "background-color:lightgreen;color:black;";
            } else {
              metaData.style = "background-color:red;color:white;";
            }
            return value;
        }
      }, {
        text: Ext.getStore("gantt.empfilterfields.store").getById("sched_hrs").data.description,
        dataIndex: 'sched_hrs',
        value: 1,
        flex: 5 / 100,
        renderer: function (value, metaData, record) {
          var vValue1 = parseFloat(record.get('avail_hrs')),
          vValue2 = parseFloat(record.get('sched_hrs')),
          vValue3 = parseFloat(record.get('to_sched_hrs')),
          vTotalValue = vValue2 + vValue3

            if (vValue1 >= vTotalValue) {
              metaData.style = "background-color:lightgreen;color:black;";
            } else {
              metaData.style = "background-color:red;color:white;";
            }
            return value;
        }
      }, {
        text: 'Hrs to sched.',
        dataIndex: 'to_sched_hrs',
        value: 1,
        minValue: 0.5,
        editor: {
          xtype: 'numberfield',
          allowBlank: false,
          minValue: 0,
          maxValue: 23
        },
        flex: 5 / 100,
        renderer: function (value, metaData, record) {
          var vValue1 = parseFloat(record.get('avail_hrs')),
          vValue2 = parseFloat(record.get('sched_hrs')),
          vValue3 = parseFloat(record.get('to_sched_hrs')),
          vTotalValue = vValue2 + vValue3

            if (vValue1 >= vTotalValue) {
              metaData.style = "background-color:lightgreen;color:black;";
            } else {
              metaData.style = "background-color:red;color:white;";
            }
            return value;
        }
      }
    ],
    selModel: {
      type: 'checkboxmodel',
      checkOnly: true,
      mode: 'MULTI'
    },
    plugins: {
      ptype: 'cellediting',
      clicksToEdit: 1,
      listeners: {
        edit: function (editor, context) {
          // SÃ©lectionner automatiquement la ligne aprÃ¨s l'Ã©dition
          var grid = context.grid;
          var record = context.record;
          grid.getSelectionModel().select(record, true, true);
          var checkboxModel = grid.getSelectionModel();

          // SÃ©lectionner et cocher la case Ã  cocher
          checkboxModel.select(record, true, true);
        }
      }
    },
    height: "100%",
    width: "100%",
    listeners: {
      deselect: function (selModel, record, index, options) {
        // Quand une ligne est dÃ©sÃ©lectionnÃ©e, mettre Ã  jour la colonne 'test'
        record.set('to_sched_hrs', 0); // Mettre 0 dans la colonne 'test'
      },
      viewready: function (grid, eOpts) {
        console.log("viewready");
        grid.view.getEl().on('scroll', function (a, b, c) {})
      },

      cellclick: function (g, rowIndex, colIndex, e) {},
      celldblclick: function (g, rowIndex, colIndex, e) {
        console.log(colIndex);
      },
      storechange: function (sender, value, oldValue, eOpts) {
        console.log("storechange");
      },
      selectionchange: function (model, selected, eOpts) {
        Ext.each(selected, function (record) {
          record.set('to_sched_hrs', 1);
        });
      },
      afteredit: function (e) {
        console.log('After edit. Column: ' + e.field);
      },
      afterrender: function (grid) {
        var cols = grid.down('gridcolumn');
        /*Ext.each(cols, function (col) {
        var icon = col.getEl().select('.header-icon')
        if (icon) { icon.swallowEvent('click', true) }
        grid.mon(icon, 'click', function () {
        // action for the header icon click event
        console.log('header icon click fired');
        })
        })*/
      }
    }
  });

  vGridPresta.getSelectionModel().on('selectionchange', function (selModel, selections) {
    console.log('SÃ©lections actuelles:', selections);
  });
  vGridPresta.getSelectionModel().on('storechange', function (selModel, selections) {
    console.log('Store actuelles:', selections);
  });

  Ext.getCmp("cust_panel_1").add(vGridPresta);
  var vGridView1 = Ext.ComponentQuery.query("#cust_panel_1 dataview ")[0];
  vGridView1.on('scroll', function (a, b, c) {
    var d = a.getEl()
      var h = a.getHeight();
    if (d) {
      d = d.dom;
    }
    if (d.scrollTop + 1 >= d.scrollHeight - h && !a.requestInProgress) {
      a.requestInProgress = !0
        console.log("on arrive Ã  la fin")
        var s = Ext.getStore('cust_Grid_Employees').gridMetaData;
      if (s.MORERECORDPRESENT === '+') {
        e = {
          'COMPONENT_INFO_TYPE': 'DATA_ONLY',
          'COMPONENT_INFO_TYPE_MODE': 'CACHE',
          'GRID_ID': s.GRIDID,
          'GRID_NAME': s.GRIDNAME,
          'DATASPY_ID': s.DATASPYID,
          'NUMBER_OF_ROWS_FIRST_RETURNED': s.CLIENTROWS,
          'CACHE_REQUEST': !1,
          'CURSOR_POSITION': parseInt(s.CURRENTCURSORPOSITION) + 1
        };
        EAM.Ajax.request({
          url: 'GETCACHE',
          maskEl: Ext.ComponentQuery.query("#cust_sched_emp")[0],
          params: e,
          async: !0,
          onSuccess: Ext.bind(function (j, i, b, e, f) {
            var a,
            d;
            if (!Ext.isEmpty(b) && EAM.Utils.propertyExists(b, 'pageData.grid.GRIDRESULT.GRID.DATA')) {
              a = b.pageData.grid.GRIDRESULT.GRID;
              e.gridMetaData = a.METADATA;
              d = a.DATA;
              //Ext.getStore('cust_Grid_SupplierCapacity').loadData(Ext.isArray(d) ? d : [], !0)

              var vG = b.pageData.grid.GRIDRESULT.GRID
                Ext.getStore('cust_Grid_Employees').MORERECORDPRESENT = vG.METADATA.MORERECORDPRESENT
                Ext.getStore('cust_Grid_Employees').CURRENTCURSORPOSITION = vG.METADATA.CURRENTCURSORPOSITION
                Ext.getStore('cust_Grid_Employees').gridMetaData = vG.METADATA

                vG.DATA.forEach(function (rec) {
                  Ext.getStore('cust_Grid_Employees').add(new Ext.data.Record({
                      id: rec.id,
                      per_code: rec.per_code,
                      per_desc: rec.per_desc,
                      per_org: rec.per_org,
                      per_trade: rec.per_trade,
                      per_mrc: rec.per_mrc,
                      avail_hrs: rec.avail_hrs,
                      sched_hrs: rec.sched_hrs,
                      to_sched_hrs: 0
                    }));
                })
            }
            f.requestInProgress = !1
          }, this, [d, c], !0)
        })
      } else {
        a.requestInProgress = !1
      }

    }

  })

  var vGridSchedEmp = Ext.create('Ext.grid.Panel', {
    id: "cust_Grid_ListEmplschd",
    xtype: 'editablegrid',
    cust_object: 'shutdown_planning',
    // plugins: [cellEditing]  ,
    store: Ext.getStore('cust_Grid_EmployeesSched'), //Ext.data.StoreManager.lookup('cust.prefact.values'),
    autoWidth: false,
    titleBar: {
      hidden: true
    },
    header: false,
    //autoHeight:false,
    //height:some-height,
    editable: !1,
    //pluginType: 'EAM.ux.grid.plugin.CellEditing',
    multiSelect: false,
    multiColumnSort: true,
    scrollable: true,
    viewConfig: {
      preserveScrollOnRefresh: false
    },
    dockedItems: [

    ],
    /*selModel: {
    type: 'checkboxmodel',
    flex : 15/100,
    mode: 'MULTI' // DÃ©finit le mode de sÃ©lection multiple
    },*/
    columns: [{
        header: "Agent",
        dataIndex: 'per_code',
        flex: 15 / 100,
        hidden: false
      }, {
        header: "description",
        dataIndex: 'per_desc',
        flex: 30 / 100,
        hidden: false
      }, {
        text: 'Date',
        dataIndex: 'acs_date',
        flex: 10 / 100,
        hidden: false,
        renderer: function (value, metaData, record) {
          return Ext.Date.format(new Date(value), EAM.AppData.getAppData().dateformat)
        }
      }, {
        text: 'Sched. Hrs',
        dataIndex: 'sched_hrs',
        flex: 5 / 100,
        hidden: false
      }, {
        text: 'acs_code',
        dataIndex: 'id',
        flex: 5 / 100,
        hidden: true
      }, {
        xtype: 'actioncolumn',
        width: 50,
        items: [{
            iconCls: 'x-tool-tool-el x-tool-img x-tool-calendar', // Chemin vers l'icÃ´ne de suppression
            tooltip: 'Edit',
            handler: function (grid, rowIndex, colIndex) {
              var rec = grid.getStore().getAt(rowIndex);
              schedule_editrecord(rec);
              //grid.getStore().remove(rec);
            }
          }
        ]
      }, {
        xtype: 'actioncolumn',
        width: 50,
        items: [{
            iconCls: 'toolbarDelete', // Chemin vers l'icÃ´ne de suppression
            tooltip: 'Delete',
            handler: function (grid, rowIndex, colIndex) {
              var rec = grid.getStore().getAt(rowIndex);
              schedule_removerecord(rec);
              //grid.getStore().remove(rec);
            }
          }
        ]
      }
    ],
    height: "100%",
    width: "100%",
    listeners: {

      viewready: function (grid, eOpts) {
        console.log("viewready");
        grid.view.getEl().on('scroll', function (a, b, c) {})
      },

      cellclick: function (g, rowIndex, colIndex, e) {},
      celldblclick: function (g, rowIndex, colIndex, e) {
        console.log(colIndex);
      },
      storechange: function (sender, value, oldValue, eOpts) {
        console.log("storechange");
      },
      selectionchange: function (model, selected, eOpts) {
        Ext.each(selected, function (record) {
          record.set('to_sched_hrs', 1);
        });
      },
      afteredit: function (e) {
        console.log('After edit. Column: ' + e.field);
      },
      afterrender: function (grid) {
        var cols = grid.down('gridcolumn');
      }
    }
  });

  Ext.getCmp("cust_panel_2").add(vGridSchedEmp);

  panel.show()
}

function click_on_resourceday(a, b, c, d, e) {

  console.log("click on resource day")
}
function click_on_baseline(a, b, c, d, e) {
  //console.log("a");
  var vBoilerList = d;
  var DateSpeMap = e;
  var vId = a.currentTarget.id;
  var vTaskId = vId.split("#")[0]
    var vAct = vId.split("#")[1]
    var vLine = vId.split("#")[3]

    var vNewRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "XUDASP",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_wo: vTaskId,
        wspf_10_wo_act: vAct,
        wspf_10_line: vLine,
        ONLY_DATA_REQUIRED: true,
        SCROLLROW: 'YES'
      }
    }).responseData.pageData.values;

  if (Ext.getCmp("DateSpeUpdPanel")) {
    Ext.getCmp("DateSpeUpdPanel").destroy()
  }

  if (!Ext.getCmp("DateSpeUpdPanel")) {

    var sDateSpeStore = Ext.getStore('gantt.datespetype.store')

      var panel = new Ext.Panel({
        title: vBoilerList["activityupdatetitle"] + " " + actTask.parent,
        frame: true,
        width: 490,
        id: 'DateSpeUpdPanel',
        height: 300,
        modal: true,
        closable: true,
        centered: true,
        floating: true,
        layout: 'vbox',
        draggable: true,
        margins: '5 5 5 5',
        layoutConfig: {
          animate: true
        },

        items: [{
            xtype: 'combobox',
            store: sDateSpeStore,
            queryMode: 'local',
            displayField: 'description',
            fieldLabel: vBoilerList["datespe_type_lb"],
            valueField: 'code',
            value: vNewRecord.wspf_10_type_date,
            id: "datespe_type",
            padding: "10px",
            allowBlank: false,
            //currentAttribute :"required",
            //requiredCls: Ext.baseCSSPrefix + 'form-required-field',
            readOnly: !0,
            readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
            listeners: {
              change: function () {}
            }
          }, {
            xtype: 'textfield',
            //queryMode: 'local',
            //displayField: 'actnote',
            //valueField: 'value',
            fieldLabel: vBoilerList["datespe_desc_lb"],
            id: 'datespe_desc',
            value: vNewRecord.wspf_10_date_desc,
            allowBlank: false,
            currentAttribute: "required",
            requiredCls: Ext.baseCSSPrefix + 'form-required-field',
            size: "50",
            maxLength: "255",
            padding: "10px"
          }, {
            xtype: 'uxdatetime',
            anchor: '100%',
            fieldLabel: vBoilerList["datespe_date_lb"],
            //fieldLabel: 'From',
            id: 'datespe_date',
            value: new Date(EAM.utils.Date.parseDate(vNewRecord.wspf_10_date_line)),
            //format: "d/m/y",																		,
            allowBlank: false,
            currentAttribute: "required",
            requiredCls: Ext.baseCSSPrefix + 'form-required-field',
            padding: "10px"
          }
        ],
        buttons: [{
            text: vBoilerList["icon_close"],
            margin: '0 0 0 5',
            handler: function () {
              panel.close();
            }
          }, {
            text: 'supprimer', //vBoilerList["icon_delete"],
            margin: '0 0 0 5',
            handler: function () {

              vNewRecord["pagemode"] = "view"
                vNewRecord["processaction"] = "delete"
                vNewRecord["webservicepromptcode"] = "XUDASP"

                var vStatus = EAM.Ajax.request({
                  url: "BSUDSC.HDR.deleterecord?pageaction=DELETE",
                  params: Ext.merge(vNewRecord, {
                    CHECK_CF_CHANGEFLAG: "true",
                    CURRENT_TAB_NAME: "HDR",
                    SYSTEM_FUNCTION_NAME: "BSUDSC",
                    USER_FUNCTION_NAME: "XUDASP",
                    can_update: "true",

                  })
                });
              if (vStatus.success) {
                var vId = vTaskId + '#' + vAct + '#0';

                if (DateSpeMap.has(vId)) {
                  var map = DateSpeMap.get(vId);
                  map.delete(vLine);
                }
                gantt.refreshTask(vId);
                panel.close();
              }
              panel.close();
            }
          }, {
            text: vBoilerList["icon_save"],
            margin: '0 0 0 5',
            handler: function (a) {
              if (Ext.isEmpty(Ext.getCmp('datespe_desc').value) || Ext.isEmpty(Ext.getCmp('datespe_type').value) || Ext.isEmpty(Ext.getCmp('datespe_date').value)) {

                if (Ext.isEmpty(Ext.getCmp('datespe_desc').value)) {
                  Ext.getCmp('datespe_desc').markInvalid(EAM.Lang.getMessage('MSG_ERR_FIELD_REQUIRED'));
                }
                if (Ext.isEmpty(Ext.getCmp('datespe_date').value)) {
                  Ext.getCmp('datespe_date').markInvalid(EAM.Lang.getMessage('MSG_ERR_FIELD_REQUIRED'));
                }
                if (Ext.isEmpty(Ext.getCmp('datespe_type').value)) {
                  Ext.getCmp('datespe_type').markInvalid(EAM.Lang.getMessage('MSG_ERR_FIELD_REQUIRED'));
                }
                EAM.Messaging.showError(EAM.Lang.getMessage('MSG_ERR_PAGE_REQUIRED'))

              } else {

                var dNewDate = new Date(Ext.getCmp('datespe_date').rawDate);
                vNewRecord["pagemode"] = "view"
                  vNewRecord["processaction"] = "sync"
                  vNewRecord["webservicepromptcode"] = "XUDASP"
                  vNewRecord["wspf_10_date_desc"] = Ext.getCmp('datespe_desc').value
                  vNewRecord["wspf_10_date_line"] = Ext.Date.format(dNewDate, 'm/d/Y H:i')
                  vNewRecord["wspf_10_type_date"] = Ext.getCmp('datespe_type').value

                  var vStatus = EAM.Ajax.request({
                    url: "BSUDSC.HDR.updaterecord?pageaction=SAVE",
                    params: Ext.merge(vNewRecord, {
                      CHECK_CF_CHANGEFLAG: "true",
                      CURRENT_TAB_NAME: "HDR",
                      SYSTEM_FUNCTION_NAME: "BSUDSC",
                      USER_FUNCTION_NAME: "XUDASP",
                      can_update: "true",

                    })
                  });
                if (vStatus.success) {
                  var vId = vTaskId + '#' + vAct + '#0';

                  if (DateSpeMap.has(vId)) {
                    var map = DateSpeMap.get(vId);
                    if (map.has(vLine)) {
                      map.get(vLine).start_date = Ext.Date.format(dNewDate, 'm/d/Y');
                      map.get(vLine).desc = Ext.getCmp('datespe_desc').value;
                      map.get(vLine).type = Ext.getCmp('datespe_type').value;
                    } else {
                      var mapdetails = {
                        start_date: Ext.Date.format(dNewDate, 'm/d/Y'),
                        desc: Ext.getCmp('datespe_desc').value,
                        type: Ext.getCmp('datespe_type').value
                      };
                      map.set(vLine, mapdetails);
                    }

                  } else {
                    var map = new Map();
                    var mapdetails = {
                      start_date: Ext.Date.format(dNewDate, 'm/d/Y'),
                      desc: Ext.getCmp('datespe_desc').value,
                      type: Ext.getCmp('datespe_type').value
                    };
                    map.set(vLine, mapdetails);
                    DateSpeMap.set(vId, map);
                  }
                  gantt.refreshTask(vId);
                  panel.close();
                }

              }
            }

          }
        ]
      });
    panel.show();
  }

}
function getColorRGB(vColor) {
  d = document.createElement("div");
  d.style.color = vColor;
  d.id = "color_test_div";
  d.cust_object = 'shutdown_planning';
  document.body.appendChild(d)
  //Color in RGB

  var vResult = window.getComputedStyle(d).color
    document.getElementById('color_test_div').parentElement.removeChild(document.getElementById('color_test_div'));
  return vResult
}
function updateUserData() {
  try {
    var vUser = EAM.AppData.getInstallParams().get("user")
  } catch (err) {};
  if (!vUser) {
    var vUser = 'R5'
  };
  var vExistingSave = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      SYSTEM_FUNCTION_NAME: "BUDUSR",
      USER_FUNCTION_NAME: "BUDUSR",
      MADDON_FILTER_ALIAS_NAME_1: "wspf_10_user_code",
      MADDON_FILTER_OPERATOR_1: "=",
      MADDON_FILTER_JOINER_1: "AND",
      MADDON_FILTER_SEQNUM_1: "1",
      MADDON_FILTER_VALUE_1: vUser
    }
  });

  if (vExistingSave.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length == 0) {

    var vRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "BUDUSR",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_user_code: '*',
        SCROLLROW: "YES",
        pagemode: "view"
      }
    }).responseData.pageData.values;

    vRecord["processaction"] = "insert";
    vRecord["pagemode"] = "display";
    vRecord["wspf_10_user_code"] = vUser;

    if (Ext.getCmp("ShowExpired").checked) {
      vRecord["wspf_10_past_wo"] = "-1";
    } else {
      vRecord["wspf_10_past_wo"] = "0";
    }
    vRecord["wspf_10_fromdate"] = Ext.Date.format(new Date(Ext.getCmp('StartDate').rawDate), 'm/d/Y');
    if (Ext.getCmp("period").value == 'Week')
      vRecord["wspf_10_nbdays"] = 7;
    else if (Ext.getCmp("period").value == 'Month')
      vRecord["wspf_10_nbdays"] = 30;
    else if (Ext.getCmp("period").value == 'Quarter')
      vRecord["wspf_10_nbdays"] = 90;
    else if (Ext.getCmp("period").value == 'Halfyear')
      vRecord["wspf_10_nbdays"] = 180;
    else if (Ext.getCmp("period").value == 'Year')
      vRecord["wspf_10_nbdays"] = 365;
    else if (Ext.getCmp("period").value == '2Year')
      vRecord["wspf_10_nbdays"] = 750;
    vRecord["wspf_10_ddspyid"] = Ext.getCmp('filter').value;
    vRecord["wspf_10_project_code"] = null;

    var vStatus = EAM.Ajax.request({
      url: "BSUDSC.HDR.insertrecord?pageaction=SAVE",
      params: Ext.merge(vRecord, {
        CHECK_CF_CHANGEFLAG: "true",
        CURRENT_TAB_NAME: "HDR",
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "BUDUSR",
        can_update: "true",

      })
    });

  } else {
    var vRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "BUDUSR",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_user_code: vUser,
        SCROLLROW: "YES",
        pagemode: "view"
      }
    }).responseData.pageData.values;
    vRecord["processaction"] = "sync";
    vRecord["wspf_10_user_code"] = vUser;
    if (Ext.getCmp("ShowExpired").checked) {
      vRecord["wspf_10_past_wo"] = "-1";
    } else {
      vRecord["wspf_10_past_wo"] = "0";
    }
    vRecord["wspf_10_fromdate"] = Ext.Date.format(new Date(Ext.getCmp('StartDate').rawDate), 'm/d/Y');
    if (Ext.getCmp("period").value == 'Week')
      vRecord["wspf_10_nbdays"] = 7;
    else if (Ext.getCmp("period").value == 'Month')
      vRecord["wspf_10_nbdays"] = 30;
    else if (Ext.getCmp("period").value == 'Quarter')
      vRecord["wspf_10_nbdays"] = 90;
    else if (Ext.getCmp("period").value == 'Halfyear')
      vRecord["wspf_10_nbdays"] = 180;
    else if (Ext.getCmp("period").value == 'Year')
      vRecord["wspf_10_nbdays"] = 360;
    else if (Ext.getCmp("period").value == '2Year')
      vRecord["wspf_10_nbdays"] = 720;
    vRecord["wspf_10_ddspyid"] = Ext.getCmp('filter').value;
    vRecord["wspf_10_project_code"] = null;

    var vStatus = EAM.Ajax.request({
      url: "BSUDSC.HDR.updaterecord?pageaction=SAVE",
      params: Ext.merge(vRecord, {
        CHECK_CF_CHANGEFLAG: "true",
        CURRENT_TAB_NAME: "HDR",
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "BUDUSR",
        can_update: "true",

      })
    });

  }
}
function clear_CustomComp() {
  var allComponents = Ext.ComponentQuery.query('[cust_object=shutdown_planning]');
  allComponents.forEach(function (rec) {
    if (Ext.getCmp(rec.id)) {
      console.log('delete cmp ' + rec.id);
      try {
        Ext.getCmp(rec.id).destroy();
      } catch (err) {}
    }
  })

  var divsWithAttribute = document.querySelectorAll('div[cust_object=shutdown_planning]');
  divsWithAttribute.forEach(function (rec) {
    if (document.getElementById(rec.id)) {
      console.log('delete div  ' + rec.id);
      document.getElementById(rec.id).parentElement.removeChild(document.getElementById(rec.id));
    };

  })

  var _elementStyle = document.getElementsByTagName("style")
    var vListOfStyleToDelete = [];
  for (var i = 0; i < _elementStyle.length; i++) {
    if (_elementStyle[i].id) {
      if (_elementStyle[i].id.indexOf("dhtmlx") > -1) {
        vListOfStyleToDelete.push(_elementStyle[i].id);
      }
    }
  }
  if (vListOfStyleToDelete.length > 0) {
    for (var i = 0; i < vListOfStyleToDelete.length; i++) {
      document.getElementsByTagName("head")[0].removeChild(document.getElementById(vListOfStyleToDelete[i]));
    }
  }
  var _elementScript = document.getElementsByTagName("script")
    var vListOfScriptToDelete = [];
  for (var i = 0; i < _elementScript.length; i++) {
    if (_elementScript[i].id) {
      if (_elementScript[i].id.indexOf("dhtmlx") > -1) {
        ////console.log("on supprime " + _elementScript[i].id)
        vListOfScriptToDelete.push(_elementScript[i].id);
      }
    }
  }
  if (vListOfScriptToDelete.length > 0) {
    for (var i = 0; i < vListOfScriptToDelete.length; i++) {
      document.getElementsByTagName("head")[0].removeChild(document.getElementById(vListOfScriptToDelete[i]));
    }
  }

  document.querySelectorAll('style[id^="gantt-static"]').forEach(function (styleTag) {
    styleTag.remove();
  });

}
function toXml(me, name, val) {
  if (val != "" && val) {
    regex = new RegExp(
        '([\\x7F-\\x84]|[\\x86-\\x9F]|[\\uFDD0-\\uFDEF]|(?:\\uD83F[\\uDFFE\\uDFFF])|(?:\\uD87F[\\uDF' +
        'FE\\uDFFF])|(?:\\uD8BF[\\uDFFE\\uDFFF])|(?:\\uD8FF[\\uDFFE\\uDFFF])|(?:\\uD93F[\\uDFFE\\uD' +
        'FFF])|(?:\\uD97F[\\uDFFE\\uDFFF])|(?:\\uD9BF[\\uDFFE\\uDFFF])|(?:\\uD9FF[\\uDFFE\\uDFFF])' +
        '|(?:\\uDA3F[\\uDFFE\\uDFFF])|(?:\\uDA7F[\\uDFFE\\uDFFF])|(?:\\uDABF[\\uDFFE\\uDFFF])|(?:\\' +
        'uDAFF[\\uDFFE\\uDFFF])|(?:\\uDB3F[\\uDFFE\\uDFFF])|(?:\\uDB7F[\\uDFFE\\uDFFF])|(?:\\uDBBF' +
        '[\\uDFFE\\uDFFF])|(?:\\uDBFF[\\uDFFE\\uDFFF])(?:[\\0-\\t\\x0B\\f\\x0E-\\u2027\\u202A-\\uD7FF\\' +
        'uE000-\\uFFFF]|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|[\\uD800-\\uDBFF](?![\\uDC00-\\uDFFF])|' +
        '(?:[^\\uD800-\\uDBFF]|^)[\\uDC00-\\uDFFF]))', 'g');

    var newValue = val.replaceAll(regex, '');
    newValue = newValue.replaceAll('&', '&amp;');
    newValue = newValue.replaceAll('>', ' ');
    newValue = newValue.replaceAll('<', ' ');
  } else {
    var newValue = "";
  }

  return '<' + name + '>' + newValue + '</' + name + '>';
}
function cust_exportToExcel(vBoilerList) {
  XlsxPopulate.fromBlankAsync()
  .then(workbook => {

    const vTitle = "Export Print Out ";
    const sheet = workbook.sheet(0);

    // on crÃ©Ã© tous les styles possibles afin de les rÃ©utiliser car sinon 1 style par cellule et le fichier peut ne plus s'ouvrir car trop de styles
    // les styles vont avec les couleurs d'OT

    const defaultStyleData = workbook.styleSheet().createStyle();
    defaultStyleData.style('wrapText', true);
    defaultStyleData.style('verticalAlignment', 'top');
    defaultStyleData.style('border', { // Enable borders
      top: {
        style: "thin"
      }, // Thin top border
      left: {
        style: "thin"
      }, // Thin left border
      bottom: {
        style: "thin"
      }, // Thin bottom border
      right: {
        style: "thin"
      } // Thin right border
    });
    const defaultStyleBorder = workbook.styleSheet().createStyle();
    defaultStyleBorder.style('border', { // Enable borders
      top: {
        style: "thin"
      }, // Thin top border
      left: {
        style: "thin"
      }, // Thin left border
      bottom: {
        style: "thin"
      }, // Thin bottom border
      right: {
        style: "thin"
      } // Thin right border
    });
    /*thestyle  = defaultStyleObjectStarted;
    }
    if(parseFloat(rec.dds_act_percomplete==""?0:rec.dds_act_percomplete)==100){
    thestyle  = defaultStyleObjectCompleted;*/
    const defaultStyleWeekEnd = workbook.styleSheet().createStyle();
    defaultStyleWeekEnd.style('wrapText', true);
    defaultStyleWeekEnd.style('bold', true);
    defaultStyleWeekEnd.style('verticalAlignment', 'top');
    defaultStyleWeekEnd.style("fill", "D3D3D3");
    defaultStyleWeekEnd.style('border', { // Enable borders
      top: {
        style: "thin"
      }, // Thin top border
      left: {
        style: "thin"
      }, // Thin left border
      bottom: {
        style: "thin"
      }, // Thin bottom border
      right: {
        style: "thin"
      } // Thin right border
    });

    const defaultStyleObject = workbook.styleSheet().createStyle();
    defaultStyleObject.style('wrapText', true);
    defaultStyleObject.style('bold', true);
    defaultStyleObject.style('verticalAlignment', 'top');
    defaultStyleObject.style("fill", "6D706E");
    defaultStyleObject.style('border', { // Enable borders
      top: {
        style: "thin"
      }, // Thin top border
      left: {
        style: "thin"
      }, // Thin left border
      bottom: {
        style: "thin"
      }, // Thin bottom border
      right: {
        style: "thin"
      } // Thin right border
    });

    const defaultStyleObjectStarted = workbook.styleSheet().createStyle();
    defaultStyleObjectStarted.style('wrapText', true);
    defaultStyleObjectStarted.style('bold', true);
    defaultStyleObjectStarted.style('verticalAlignment', 'top');
    defaultStyleObjectStarted.style("fill", "F3EF14");
    defaultStyleObjectStarted.style('border', { // Enable borders
      top: {
        style: "thin"
      }, // Thin top border
      left: {
        style: "thin"
      }, // Thin left border
      bottom: {
        style: "thin"
      }, // Thin bottom border
      right: {
        style: "thin"
      } // Thin right border
    });

    const defaultStyleObjectCompleted = workbook.styleSheet().createStyle();
    defaultStyleObjectCompleted.style('wrapText', true);
    defaultStyleObjectCompleted.style('bold', true);
    defaultStyleObjectCompleted.style('verticalAlignment', 'top');
    defaultStyleObjectCompleted.style("fill", "34F134");
    defaultStyleObjectCompleted.style('border', { // Enable borders
      top: {
        style: "thin"
      }, // Thin top border
      left: {
        style: "thin"
      }, // Thin left border
      bottom: {
        style: "thin"
      }, // Thin bottom border
      right: {
        style: "thin"
      } // Thin right border
    });

    // dÃ©finition des colonnes donnÃ©es du fichier Excel
    if (Ext.getStore('gantt.exportxlsstylesM.settings')) {
      Ext.getStore('gantt.exportxlsstylesM.settings').destroy();
    }
    var vExportXlsSylesModele = Ext.create('Ext.data.Store', {
      id: 'gantt.exportxlsstylesM.settings',
      fields: ['id', 'nom', 'color', 'colortext', 'styleobj'],
      data: []
    });

    vExportXlsSylesModele.add({
      "id": "Activity",
      "nom": "custom",
      "color": "#D3D3D3",
      "colortext": "#f8f9f9"
    })
    gantt.getTaskByTime().forEach(function (task) {
      var vInitColor = task.color;
      if (vInitColor.indexOf("rgb") == 0) {
        vInitColor = task.color.replaceAll("rgb(", "").replaceAll(" ", "").replaceAll(")", "").split(",")
          vInitColor = "#" + ((1 << 24) + (parseFloat(vInitColor[0]) << 16) + (parseFloat(vInitColor[1]) << 8) + parseFloat(vInitColor[2])).toString(16).slice(1).toUpperCase();
        var vColor = task.color;
      } else {
        var vColor = getColorRGB(vInitColor);
      }
      if (!vExportXlsSylesModele.getById(vInitColor.toUpperCase())) {
        var vPoliceColor = "FFFFFF";

        var vColorRGB = vColor.replaceAll("rgb(", "").replaceAll(" ", "").replaceAll(")", "").split(",")
          //var luma = 0.2126 * parseInt(vColorRGB[0]) + 0.7152 *  parseInt(vColorRGB[1])  + 0.0722 *  parseInt(vColorRGB[2]) ;
          var luma = ((parseInt(vColorRGB[0]) * 299) + (parseInt(vColorRGB[1]) * 587) + (parseInt(vColorRGB[2]) * 114)) / 1000;
        if (luma > 155) {
          // pick a different colour
          vPoliceColor = "000000"
        } else {
          vPoliceColor = "FFFFFF"
        }
        vExportXlsSylesModele.add({
          "id": vInitColor.toUpperCase(),
          "nom": "custom_" + vInitColor,
          "color": vInitColor,
          "colortext": vPoliceColor
        })

      }

    })

    if (Ext.getStore('gantt.exportxlsstyles.settings')) {
      Ext.getStore('gantt.exportxlsstyles.settings').destroy();
    }
    var vExportXlsSyles = Ext.create('Ext.data.Store', {
      id: 'gantt.exportxlsstyles.settings',
      fields: ['nom', 'styleobj'],
      data: []
    });
    for (var i = 0, it = vExportXlsSylesModele.data.items, l = it.length; i < l; i++) {
      rec = it[i].data;
      const columnStyle = workbook.styleSheet().createStyle();
      columnStyle.style('wrapText', true);
      columnStyle.style('bold', true);
      columnStyle.style('verticalAlignment', 'top');
      columnStyle.style("fill", rec["color"].replace("#", "").toUpperCase());
      columnStyle.style("fontColor", rec["colortext"].replace("#", "").toUpperCase());
      columnStyle.style('border', { // Enable borders
        top: {
          style: "thin"
        }, // Thin top border
        left: {
          style: "thin"
        }, // Thin left border
        bottom: {
          style: "thin"
        }, // Thin bottom border
        right: {
          style: "thin"
        } // Thin right border
      });
      vExportXlsSyles.add({
        "id": rec['id'],
        "nom": rec['nom'],
        "styleobj": columnStyle
      })
    }

    // Appliquer le style pour le texte en couleur rouge
    var dTimeStartDate = new Date(gantt.config.start_date);
    var dTimeEndDate = new Date(gantt.config.end_date);

    var dHdrdDate = new Date(Ext.Date.format(dTimeStartDate, 'm/d/Y'));
    var dLastDate = new Date(Ext.Date.format(dTimeEndDate, 'm/d/Y'));
    // dÃ©finition des colonnes donnÃ©es du fichier Excel
    if (Ext.getStore('gantt.exportxlscolumns.settings')) {
      Ext.getStore('gantt.exportxlscolumns.settings').destroy();
    }

    var vListOfColumns = [];
    for (var i = 0, col = gantt.getGridColumns(), l = col.length; i < l; i++) {
      let _col = col[i];
      if (_col.typeColumn != "icon") {
        vListOfColumns.push({
          "header": _col.header,
          "data": _col.name,
          "width": (parseFloat(_col.width) / 8),
          "type": _col.typeColumn
        })
      }
    }
    var vExportXlsColumns = Ext.create('Ext.data.Store', {
      id: 'gantt.exportxlscolumns.settings',
      fields: ['header', 'data', 'width'],
      data: vListOfColumns
    });

    var vNewColDate = vExportXlsColumns.data.length + 1; //8; // dÃ©pend du nb de colonnes donnÃ©es affichÃ©es

    var numDateRow = 4;

    var numColDate = vExportXlsColumns.data.length + 1; //8; // dÃ©pend du nb de colonnes donnÃ©es affichÃ©es

    sheet.cell(1, 2).value(vBoilerList["export_excel_from"] + ' ' + Ext.Date.format(dTimeStartDate, EAM.AppData.getAppData().dateformat) + ' ' + vBoilerList["export_excel_to"] + ' ' + Ext.Date.format(dTimeEndDate, EAM.AppData.getAppData().dateformat));
    //sheet.cell(1, 2).style({
    //  fontColor: "FF0000"
    //});

    if (Ext.getStore('gantt.exportxlsstore.settings')) {
      Ext.getStore('gantt.exportxlsstore.settings').destroy();
    }
    var vExportXlsStore = Ext.create('Ext.data.Store', {
      id: 'gantt.exportxlsstore.settings',
      fields: [],
      data: []
    });

    for (var i = 0, it = gantt.getTaskByTime(), l = it.length; i < l; i++) {
      vLine = [];
      rec = it[i];
      if (rec.type == "Project") {
        vExportXlsStore.add(rec)
        vExportXlsStore.getById(rec.id).data.parent = rec.id;
        vExportXlsStore.getById(rec.id).data.type = "1";
      } // endif "Project"


      if (rec.type == "Activity") {
        vExportXlsStore.add(rec)
        vExportXlsStore.getById(rec.id).data.type = "2";
      }
    }

    vExportXlsStore.sort([{
          property: 'parent',
          direction: 'ASC'
        }, {
          property: 'type',
          direction: 'ASC'
        }, {
          property: 'start_date',
          direction: 'ASC'
        }, {
          property: 'end_date',
          direction: 'ASC'
        }
      ]);
    while (dHdrdDate <= dLastDate) {
      //console.log(dHdrdDate);
      sheet.cell(numDateRow - 2, numColDate).value(Ext.Date.format(dHdrdDate, 'Y'));

      sheet.cell(numDateRow - 1, numColDate).value(Ext.Date.format(dHdrdDate, 'm'));
      sheet.cell(numDateRow, numColDate).value(Ext.Date.format(dHdrdDate, 'd'));
      sheet.cell(numDateRow - 2, numColDate)._style = defaultStyleBorder;
      sheet.cell(numDateRow - 1, numColDate)._style = defaultStyleBorder;
      sheet.cell(numDateRow, numColDate)._style = defaultStyleBorder;

      sheet.column(numColDate).width(3);

      dHdrdDate.setDate(dHdrdDate.getDate() + 1);
      numColDate++
    }

    var vTableYear = [];
    var vTableMonth = [];
    while (vNewColDate <= numColDate) {
      if (sheet.cell(2, vNewColDate).value() != undefined) {
        if (!vTableYear.find(vTableYear => vTableYear.year === sheet.cell(2, vNewColDate).value())) {
          vTableYear.push({
            "year": sheet.cell(2, vNewColDate).value(),
            "firstcol": vNewColDate,
            "lastCol": vNewColDate
          })
        } else {
          vTableYear.find(vTableYear => vTableYear.year === sheet.cell(2, vNewColDate).value()).lastCol = vNewColDate;
        }
        if (!vTableMonth.find(vTableMonth => vTableMonth.month === (sheet.cell(2, vNewColDate).value()).toString() + (sheet.cell(3, vNewColDate).value()).toString())) {
          vTableMonth.push({
            "month": (sheet.cell(2, vNewColDate).value()).toString() + (sheet.cell(3, vNewColDate).value()).toString(),
            "firstcol": vNewColDate,
            "lastCol": vNewColDate
          })
        } else {
          vTableMonth.find(vTableMonth => vTableMonth.month === sheet.cell(2, vNewColDate).value().toString() + sheet.cell(3, vNewColDate).value().toString()).lastCol = vNewColDate;
        }

      }
      vNewColDate++;
    }

    vTableYear.forEach(function (rec) {
      if (rec.year != undefined) {
        sheet.range(2, rec.firstcol, 2, rec.lastCol).merged(true);
      }

    });
    vTableMonth.forEach(function (rec) {
      if (rec.month != undefined) {
        sheet.range(3, rec.firstcol, 3, rec.lastCol).merged(true);
      }

    });
    //ligne d'ent^te
    for (var i = 0, it = vExportXlsColumns.data.items, l = it.length; i < l; i++) {
      rec = it[i].data;
      sheet.cell(numDateRow, i + 1).value(rec['header']);
      sheet.column(i + 1).width(rec['width']);
      sheet.cell(numDateRow, i + 1)._style = defaultStyleBorder;

    }
    var numDataRow = 0
      for (var i = 0, it = vExportXlsStore.data.items, l = it.length; i < l; i++) {
        try {
          vLine = [];
          rec = it[i].data;
          numDataRow++;

          let thestyle;
          if (rec.type == "2") { //objet et non WO (il n'y a que les OT dans l'excel pas de hierarchie avec l'Ã©quipement)
            thestyle = defaultStyleObject;
            if (parseFloat(rec.dds_act_percomplete == "" ? 0 : rec.dds_act_percomplete) > 0 && parseFloat(rec.dds_act_percomplete == "" ? 0 : rec.dds_act_percomplete) <= 99) {
              thestyle = defaultStyleObjectStarted;
            }
            if (parseFloat(rec.dds_act_percomplete == "" ? 0 : rec.dds_act_percomplete) == 100) {
              thestyle = defaultStyleObjectCompleted;
            }
            console.log(rec.id);
            console.log(thestyle);
          } else {
            thestyle = defaultStyleObject;

            var vInitColor = rec['color'];
            if (vInitColor.indexOf("rgb") == 0) {
              vInitColor = vInitColor.replaceAll("rgb(", "").replaceAll(" ", "").replaceAll(")", "").split(",")
                vInitColor = "#" + ((1 << 24) + (parseFloat(vInitColor[0]) << 16) + (parseFloat(vInitColor[1]) << 8) + parseFloat(vInitColor[2])).toString(16).slice(1).toUpperCase();
            }
            let thecolor = vInitColor;

            //on doit trouver le style dans vExportXlsSyles en fonction de la couleur
            if (vExportXlsSyles.getById(thecolor)) {
              thestyle = vExportXlsSyles.getById(thecolor).get('styleobj');
            }

          }

          //on parcours les colonnes pour afficher les valeurs
          for (var j = 0, itv = vExportXlsColumns.data.items, m = itv.length; j < m; j++) {
            rec2 = itv[j].data;
            //si la colonne est une date on la formatte
            if (rec2.type == "DATE") {
              let _Value = "";
              if (Ext.Date.isDate(rec[rec2['data']])) {
                _Value = Ext.Date.format(rec[rec2['data']], EAM.AppData.getAppData().dateformat)
              } else {
                _Value = rec[rec2['data']]

              }
              sheet.cell(numDateRow + numDataRow, j + 1).value(_Value);
            } else {
              if (rec2.type == "DATETIME") {
                let _Value = "";
                if (Ext.Date.isDate(rec[rec2['data']])) {
                  _Value = Ext.Date.format(rec[rec2['data']], EAM.AppData.getAppData().dateformat + ' H:i')
                } else {
                  _Value = rec[rec2['data']]
                }
                sheet.cell(numDateRow + numDataRow, j + 1).value(_Value);
              } else {
                sheet.cell(numDateRow + numDataRow, j + 1).value(rec[rec2['data']]);
              }
            }
            sheet.cell(numDateRow + numDataRow, j + 1)._style = thestyle;

          }
          //on met des bordures aux cellules dates avant d'appliquer le style avec la couleur (qui a aussi une bordure)
          for (let col = vExportXlsColumns.data.length + 1; col < numColDate; col++) {
            sheet.cell(numDateRow + numDataRow, col)._style = defaultStyleBorder;
          }
          var dTimeStartDate = new Date(gantt.config.start_date);
          var dTimeEndDate = new Date(gantt.config.end_date);
          var vTaskStartDate = new Date(Ext.Date.format(rec["start_date"], 'm/d/Y'));
          if (vTaskStartDate < dTimeStartDate) {
            vTaskStartDate = new Date(dTimeStartDate)
          }
          var vTaskEndDate = new Date(Ext.Date.format(rec["end_date"], 'm/d/Y'));
          if (vTaskEndDate > dTimeEndDate) {
            vTaskEndDate = new Date(dTimeEndDate)
          }

          if (vTaskStartDate < dTimeStartDate && vTaskEndDate > dTimeStartDate) {
            var dDiff1 = 0;
            var dDiff2 = Ext.Date.diffDays(dTimeStartDate, vTaskEndDate);
          } else {
            var dDiff1 = Ext.Date.diffDays(dTimeStartDate, vTaskStartDate);
            var dDiff2 = Ext.Date.diffDays(dTimeStartDate, vTaskEndDate);
          }

          let vColTask = 0;
          let vColTaskDate = 0;
          let vColTaskEnd = 0;
          let _DateTemp = new Date(dTimeStartDate)

            vColTask = vColTask = vExportXlsColumns.data.length + 1 + dDiff1; //8 + dDiff1;
          vColTaskEnd = vExportXlsColumns.data.length + 1 + dDiff2; //8 + dDiff2;
          vColTaskDate = vExportXlsColumns.data.length + 1

            while (_DateTemp <= dTimeEndDate) {
              if (_DateTemp.getDay() == 0 || _DateTemp.getDay() == 6) {
                sheet.cell(numDateRow + numDataRow, vColTaskDate)._style = defaultStyleWeekEnd;
              }

              _DateTemp.setDate(_DateTemp.getDate() + 1);
              vColTaskDate++

            }

            if (dDiff1 >= 0 && dDiff2 >= 0) {

              while (vColTask <= vColTaskEnd) {
                sheet.cell(numDateRow + numDataRow, vColTask)._style = thestyle;
                vColTask++;
              }
            }

        } catch (error) {
          console.log(error);
        }

      }

      sheet.freezePanes(3, 4);

    // TÃ©lÃ©charger le fichier Excel
    workbook.outputAsync().then(function (blob) {
      saveAs(blob, vTitle + "_" + Ext.Date.format(new Date(), "Y-m-d_Hi") + ".xlsx");
    });
  });

};
function exportToXls() {
  var vXml = "<data>";

  var tasks = gantt.getTaskByTime();

  var nCount = 0
    for (i = 0; i < tasks.length; i++) {

      if (tasks[i].type == "Activity" && (!gantt.hasChild(tasks[i].id) )) {

        vXml += "<task>"
        vXml += "<id>" + tasks[i].id + "</id>"

        vXml += "<act_act>" + tasks[i].id.split('#')[1] + "</act_act>"
        vXml += toXml(me, 'act_desc', tasks[i].act_desc)
        vXml += "<act_trade>" + tasks[i].act_trade + "</act_trade>"
        vXml += "<actest>" + tasks[i].actest + "</actest>"
        vXml += "<assignedto>" + tasks[i].projmanager + "</assignedto>"
        vXml += "<color>" + tasks[i].color + "</color>"
        vXml += "<dds_act_act>" + tasks[i].id.split('#')[1] + "</dds_act_act>"
        vXml += "<dds_act_assignmentstatus>" + tasks[i].dds_act_assignmentstatus + "</dds_act_assignmentstatus>"
        vXml += "<dds_act_est>" + tasks[i].dds_act_est + "</dds_act_est>"
        vXml += toXml(me, 'dds_act_note', tasks[i].dds_act_note)
        vXml += "<dds_act_percomplete>" + tasks[i].dds_act_percomplete + "</dds_act_percomplete>"
        vXml += "<dds_act_persons>" + tasks[i].dds_act_persons + "</dds_act_persons>"
        vXml += toXml(me, 'dds_act_statut_desc', tasks[i].dds_act_statut_desc)
        vXml += "<dds_act_supplier>" + tasks[i].dds_act_supplier + "</dds_act_supplier>"
        vXml += "<dds_act_trade>" + tasks[i].dds_act_trade + "</dds_act_trade>"
        vXml += toXml(me, 'dds_act_supplier_desc', tasks[i].dds_act_supplier_desc)
        vXml += toXml(me, 'dds_act_trade_desc', tasks[i].dds_act_trade_desc)
        vXml += "<dds_act_udfchar20>" + tasks[i].dds_act_udfchar20 + "</dds_act_udfchar20>"
        vXml += "<dds_act_udfnote01>" + tasks[i].dds_act_udfnote01 + "</dds_act_udfnote01>"
        vXml += "<dds_act_udfnum01>" + tasks[i].dds_act_udfnum01 + "</dds_act_udfnum01>"
        vXml += toXml(me, 'dds_class_desc', tasks[i].dds_class_desc)
        vXml += "<dds_eqjwoclasscolor>" + tasks[i].dds_eqjwoclasscolor + "</dds_eqjwoclasscolor>"
        vXml += "<dds_evt_mrc>" + tasks[i].dds_evt_mrc + "</dds_evt_mrc>"
        vXml += "<dds_evt_object>" + tasks[i].dds_evt_object + "</dds_evt_object>"
        vXml += "<dds_evt_object_org>" + tasks[i].dds_evt_object_org + "</dds_evt_object_org>"
        vXml += "<dds_evt_org>" + tasks[i].dds_evt_org + "</dds_evt_org>"
        vXml += "<dds_evt_project>" + tasks[i].dds_evt_project + "</dds_evt_project>"
        vXml += "<dds_evt_rtype>" + tasks[i].dds_evt_rtype + "</dds_evt_rtype>"
        vXml += "<dds_evt_schedend_form>" + tasks[i].dds_evt_schedend_form + "</dds_evt_schedend_form>"
        vXml += "<dds_isstype>" + tasks[i].dds_isstype + "</dds_isstype>"
        vXml += toXml(me, 'dds_jobtype_desc', tasks[i].dds_jobtype_desc)
        vXml += toXml(me, 'dds_mrc_desc', tasks[i].dds_mrc_desc)
        vXml += "<dds_obj_location>" + tasks[i].dds_obj_location + "</dds_obj_location>"
        vXml += toXml(me, 'dds_priority_desc', tasks[i].dds_priority_desc)
        vXml += "<dds_pwa_end>" + tasks[i].dds_pwa_end + "</dds_pwa_end>"
        vXml += "<dds_pwa_start>" + tasks[i].dds_pwa_start + "</dds_pwa_start>"
        vXml += "<dds_pwa_subact>" + tasks[i].id.split('#')[2] + "</dds_pwa_subact>"
        vXml += toXml(me, 'dds_status_desc', tasks[i].dds_status_desc)
        vXml += "<denied>" + tasks[i].denied + "</denied>"
        vXml += toXml(me, 'desc', tasks[i].desc)
        vXml += "<due_date>" + tasks[i].due_date + "</due_date>"
        vXml += "<duration>" + tasks[i].duration + "</duration>"
        vXml += "<end_date>" + Ext.Date.format(tasks[i].end_date, 'Y-m-d H:i') + "</end_date>"
        vXml += "<equipment>" + tasks[i].equipment + "</equipment>"
        vXml += "<estimatedhrs>" + tasks[i].estimatedhrs + "</estimatedhrs>"
        vXml += toXml(me, 'evt_status_desc', tasks[i].prjstatus_desc)
        vXml += "<project_code>" + tasks[i].proj_code + "</project_code>"
        vXml += toXml(me, 'obj_desc', tasks[i].obj_desc)
        vXml += "<organization>" + tasks[i].organization + "</organization>"
        vXml += "<parent>" + tasks[i].parent + "</parent>"
        vXml += "<progress>" + tasks[i].progress + "</progress>"
        vXml += "<start_date>" + Ext.Date.format(tasks[i].start_date, 'Y-m-d H:i') + "</start_date>"
        vXml += "<type>" + tasks[i].type + "</type>"
        if (tasks[i].wo.indexOf('#') > 0) {
          vXml += "<wo>" + tasks[i].wo.split('#')[0] + "</wo>"
        } else {
          vXml += "<wo>" + tasks[i].wo + "</wo>"
        }

        vXml += "<womrc>" + tasks[i].womrc + "</womrc>"
        vXml += "<wostatus>" + tasks[i].wostatus + "</wostatus>"
        vXml += "</task>"

        nCount = nCount + 1

      }
    }
    vXml += "</data>";
  var vLoad = EAM.Ajax.request({
    url: "BSUDSC",
    params: {
      SYSTEM_FUNCTION_NAME: "BSUDSC",
      USER_FUNCTION_NAME: "BUEPPO",
      CURRENT_TAB_NAME: null,
      FUNCTION_CLASS: "WEBD",
      removescreenflows: "yes",
      MENU_MODULE_KEY: 0
    }
  })

    try {
      var vUser = EAM.AppData.getInstallParams().get("user")
    } catch (err) {};
  if (!vUser) {
    var vUser = 'R5'
  };

  var vExistingSave = EAM.Ajax.request({
    url: "GRIDDATA",
    params: {
      SYSTEM_FUNCTION_NAME: "BUEPPO",
      USER_FUNCTION_NAME: "BUEPPO",
      MADDON_FILTER_ALIAS_NAME_1: "wspf_10_user_code",
      MADDON_FILTER_OPERATOR_1: "=",
      MADDON_FILTER_JOINER_1: "AND",
      MADDON_FILTER_SEQNUM_1: "1",
      MADDON_FILTER_VALUE_1: vUser
    }
  });

  if (vExistingSave.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length == 0) {
    var vRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "BUEPPO",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_user_code: "*",
        SCROLLROW: "YES",
        pagemode: "view"
      }
    }).responseData.pageData.values;

    vRecord["processaction"] = "insert";
    vRecord["wspf_10_user_code"] = vUser;
    vRecord["wspf_10_start_date"] = Ext.Date.format(new Date(gantt.config.start_date), 'm/d/Y');
    vRecord["wspf_10_end_date"] = Ext.Date.format(new Date(gantt.config.end_date), 'm/d/Y');
    vRecord["wspf_10_c_data"] = vXml;
    vRecord["wspf_10_view_type"] = Ext.getCmp("viewmode_gantt").value;

    var vStatus = EAM.Ajax.request({
      url: "BSUDSC.HDR.insertrecord?pageaction=SAVE",
      params: Ext.merge(vRecord, {
        CHECK_CF_CHANGEFLAG: "true",
        CURRENT_TAB_NAME: "HDR",
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "BUEPPO",
        can_update: "true",
      })
    });

    if (vStatus.success) {
      var d = {};
      var vFormPanel = EAM.Utils.getCurrentTab().getFormPanel();
      var vPeriodStart = Ext.Date.format(new Date(gantt.config.start_date), 'Y-m-d');
      var vPeriodEnd = Ext.Date.format(new Date(gantt.config.end_date), 'Y-m-d');
      d.periodStart = vPeriodStart;
      d.periodEnd = vPeriodEnd;
      d.usercode = vUser;
      d.reportname = "DUPLGD";
      d.reportparameters = "SEL_STARTDATE=periodStart,SEL_ENDDATE=periodEnd,R5_USER=usercode";
      EAM.Utils.runSingleRecordReportActual(vFormPanel.getScreen(), "PREVIEW", d, null, d.reportname, "REPC");

    }

  } else {

    var vRecord = EAM.Ajax.request({
      url: "BSUDSC.HDR",
      params: {
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "BUEPPO",
        CURRENT_TAB_NAME: "HDR",
        wspf_10_user_code: vUser,
        SCROLLROW: "YES",
        pagemode: "view"
      }
    }).responseData.pageData.values;

    vRecord["processaction"] = "sync";
    vRecord["wspf_10_user_code"] = vUser;
    vRecord["wspf_10_start_date"] = Ext.Date.format(new Date(gantt.config.start_date), 'm/d/Y');
    vRecord["wspf_10_end_date"] = Ext.Date.format(new Date(gantt.config.end_date), 'm/d/Y');
    vRecord["wspf_10_c_data"] = vXml;
    vRecord["wspf_10_view_type"] = Ext.getCmp("viewmode_gantt").value;

    var vStatus = EAM.Ajax.request({
      url: "BSUDSC.HDR.updaterecord?pageaction=SAVE",
      params: Ext.merge(vRecord, {
        CHECK_CF_CHANGEFLAG: "true",
        CURRENT_TAB_NAME: "HDR",
        SYSTEM_FUNCTION_NAME: "BSUDSC",
        USER_FUNCTION_NAME: "BUEPPO",
        can_update: "true",
      })
    });

    if (vStatus.success) {
      //var vMsg = gantt.locale.labels.savefilter_success_message;
      //EAM.Messaging.showConfirmation(vMsg);
      var d = {};
      var vFormPanel = EAM.Utils.getCurrentTab().getFormPanel();
      var vPeriodStart = Ext.Date.format(new Date(gantt.config.start_date), 'Y-m-d');
      var vPeriodEnd = Ext.Date.format(new Date(gantt.config.end_date), 'Y-m-d');
      d.periodStart = vPeriodStart;
      d.periodEnd = vPeriodEnd;
      d.usercode = vUser;
      d.reportname = "DUPLGD";
      d.reportparameters = "SEL_STARTDATE=periodStart,SEL_ENDDATE=periodEnd,R5_USER=usercode";
      EAM.Utils.runSingleRecordReportActual(vFormPanel.getScreen(), "PREVIEW", d, null, d.reportname, "REPC");
    }
  }

}
function undo(undoStack, redoStack) {
  if (Ext.getStore('gantt.undo.store').data.items.length === 0)
    return;

  //const lastAction = undoStack.pop();
  var lastActionRecord = Ext.getStore('gantt.undo.store').last()
    var lastAction = lastActionRecord.data;

  //redoStack.push(lastAction);
  if (lastAction.parentTaskId != null) {
    var lParentTask = lastAction.parentTaskId;
    var InitParentTask = lastAction.parentTaskId;
    var LastRow = false;

    while ((lParentTask == InitParentTask || lastAction.taskid == InitParentTask.split('_')[0]) && !LastRow) {

      sessionStorage.setItem("undoactionupdate", "OK");
      const OldTask = Ext.JSON.decode(lastAction.task);
      const OldStartDate = new Date(OldTask.start_date);
      const OldEndDate = new Date(OldTask.end_date);
      const OldPrevtartDate = new Date(OldTask.prev_start);
      const OldPrevEndDate = new Date(OldTask.prev_end);
      /*if(OldPrevtartDate.getTime() != gantt.getTask(lastAction.taskid).start_date.getTime() ||
      OldStartDate.getTime() != OldPrevtartDate.getTime() ||
      OldPrevEndDate.getTime() != gantt.getTask(lastAction.taskid).end_date.getTime() ||
      OldEndDate.getTime() != OldPrevEndDate.getTime())*/
      {
        OldTask.prev_start = gantt.getTask(lastAction.taskid).start_date;
        OldTask.start_date = OldPrevtartDate;
        OldTask.prev_end = gantt.getTask(lastAction.taskid).end_date;
        OldTask.end_date = OldPrevEndDate;

        gantt.updateTask(lastAction.taskid, OldTask);
        sessionStorage.removeItem("undoactionupdate");
        gantt.refreshData();
        Ext.getStore('gantt.undo.store').remove(lastActionRecord);
        Ext.getStore('gantt.redo.store').add(lastActionRecord);

      }
      if (Ext.getStore('gantt.undo.store').data.items.length > 0) {
        lastActionRecord = Ext.getStore('gantt.undo.store').last();
        lastAction = lastActionRecord.data;
        lParentTask = lastAction.parentTaskId;
      } else {
        LastRow = true;
      }

    }

  } else {
    switch (lastAction.type) {
    case "changepostpone":
      sessionStorage.setItem("undoactionchangepostpone", "OK");
      Ext.getCmp("PostPoneOp").setValue(!lastAction.value)
      break;
    case "add":

      gantt.deleteTask(lastAction.taskid);
      break;
    case "addLink":
      if (gantt.isLinkExists(lastAction.task.id)) {
        sessionStorage.setItem("undoactionupdateLink", "OK");
        gantt.deleteLink(lastAction.task.id);
        sessionStorage.removeItem("undoactionupdateLink");
      }
      break;
    case "update":
      sessionStorage.setItem("undoactionupdate", "OK");
      const OldTask = Ext.JSON.decode(lastAction.task);
      const OldStartDate = new Date(OldTask.start_date);
      const OldEndDate = new Date(OldTask.end_date);
      const OldPrevtartDate = new Date(OldTask.prev_start);
      const OldPrevEndDate = new Date(OldTask.prev_end);
      {
        OldTask.prev_start = gantt.getTask(lastAction.taskid).start_date;
        OldTask.start_date = OldPrevtartDate;
        OldTask.prev_end = gantt.getTask(lastAction.taskid).end_date;
        OldTask.end_date = OldPrevEndDate;

        gantt.updateTask(lastAction.taskid, OldTask);
        sessionStorage.removeItem("undoactionupdate");
        gantt.refreshData();

      }
      break;
    case "delete":

      gantt.addTask(lastAction.task);

      break;
    case "deleteLink":
      sessionStorage.setItem("undoactionupdateLink", "OK");
      gantt.addLink(lastAction.task);
      sessionStorage.removeItem("undoactionupdateLink");
      break;
    }
    Ext.getStore('gantt.undo.store').remove(lastActionRecord);
    Ext.getStore('gantt.redo.store').add(lastActionRecord);
  }
  if (Ext.getStore('gantt.undo.store').data.items.length === 0) {
    var vSave = document.getElementById("savebtn");
    vSave.style.background = "";
  }
}
// Redo function
function redo(undoStack, redoStack) {
  if (Ext.getStore('gantt.redo.store').data.items.length === 0)
    return;

  //const lastAction = redoStack.pop();
  var lastActionRecord = Ext.getStore('gantt.redo.store').last()
    var lastAction = lastActionRecord.data;

  var existsChildren = false

    var ListOfChildren = [];

  Ext.getStore('gantt.redo.store').data.items.forEach(function (rec) {
    if (rec.data.parentTaskId != null && rec.data.parentTaskId != "") {
      if (rec.data.parentTaskId === lastAction.parentTaskId) {
        ListOfChildren.push(rec.data.id);
      }

    }

  });
  if (ListOfChildren.length > 1) {
    existsChildren = true;
  }

  if (lastAction.parentTaskId != null || existsChildren) {
    /*if(lastAction.parentTaskId!=null){
    var lParentTask = lastAction.parentTaskId;
    var InitParentTask = lastAction.parentTaskId;
    var LastRow=false;

    while((lParentTask==InitParentTask||lastAction.taskid==InitParentTask.split('_')[0])&&!LastRow){

    sessionStorage.setItem("redoactionupdate", "OK");
    var OldTask = Ext.JSON.decode(lastAction.task);
    var OldStartDate = new Date(OldTask.start_date);
    var OldEndDate = new Date(OldTask.end_date);
    var OldPrevtartDate = new Date(OldTask.prev_start);
    var OldPrevEndDate = new Date(OldTask.prev_end);{
    OldTask.prev_start = gantt.getTask(lastAction.taskid).start_date;
    OldTask.start_date = OldPrevtartDate;
    OldTask.prev_end = gantt.getTask(lastAction.taskid).end_date;
    OldTask.end_date = OldPrevEndDate;


    gantt.updateTask(lastAction.taskid, OldTask);
    sessionStorage.removeItem("redoactionupdate");
    gantt.refreshData();

    Ext.getStore('gantt.redo.store').remove(lastActionRecord);
    Ext.getStore('gantt.undo.store').add(lastActionRecord);


    }
    if (Ext.getStore('gantt.undo.store').data.items.length > 0) {
    lastActionRecord =  Ext.getStore('gantt.undo.store').last();
    lastAction = lastActionRecord.data;
    lParentTask = lastAction.parentTaskId;
    }
    else{
    LastRow=true;
    }

    }
    }
    if(lastAction.parentTaskId==null&&existsChildren)*/
    {
      /*sessionStorage.setItem("redoactionupdate", "OK");
      var OldTask = Ext.JSON.decode(lastAction.task);
      var OldStartDate = new Date(OldTask.start_date);
      var OldEndDate = new Date(OldTask.end_date);
      var OldPrevtartDate = new Date(OldTask.prev_start);
      var OldPrevEndDate = new Date(OldTask.prev_end);
      OldTask.prev_start = gantt.getTask(lastAction.taskid).start_date;
      OldTask.start_date = OldPrevtartDate;
      OldTask.prev_end = gantt.getTask(lastAction.taskid).end_date;
      OldTask.end_date = OldPrevEndDate;


      gantt.updateTask(lastAction.taskid, OldTask);
      sessionStorage.removeItem("redoactionupdate");
      gantt.refreshData();

      Ext.getStore('gantt.redo.store').remove(lastActionRecord);
      Ext.getStore('gantt.undo.store').add(lastActionRecord);*/

      ListOfChildren.forEach(function (rec) {

        var ChildAction = Ext.getStore('gantt.redo.store').getById(rec);

        if (ChildAction) {
          sessionStorage.setItem("redoactionupdate", "OK");
          sessionStorage.setItem("redoactionupdateId", lastAction.parentTaskId);
          var OldTask = Ext.JSON.decode(ChildAction.data.task);
          var OldStartDate = new Date(OldTask.start_date);
          var OldEndDate = new Date(OldTask.end_date);
          var OldPrevtartDate = new Date(OldTask.prev_start);
          var OldPrevEndDate = new Date(OldTask.prev_end);
          OldTask.prev_start = OldPrevtartDate
            OldTask.start_date = OldStartDate
            OldTask.prev_end = OldPrevEndDate;
          OldTask.end_date = OldEndDate;
          gantt.updateTask(ChildAction.data.taskid, OldTask);
          sessionStorage.removeItem("redoactionupdate");
          sessionStorage.removeItem("redoactionupdateId");
          gantt.refreshData();
          Ext.getStore('gantt.redo.store').remove(ChildAction);
          Ext.getStore('gantt.undo.store').add(ChildAction);
        }

      });

    }
  } else {
    switch (lastAction.type) {
    case "changepostpone":
      sessionStorage.setItem("redoactionchangepostpone", "OK");
      Ext.getCmp("PostPoneOp").setValue(lastAction.value)
      break;
    case "add":
      gantt.addTask(lastAction.task);
      break;

    case "addLink":
      gantt.addLink(lastAction.task);
      break;

    case "update":
      sessionStorage.setItem("redoactionupdate", "OK");
      const OldTask = Ext.JSON.decode(lastAction.task);
      const OldStartDate = new Date(OldTask.start_date);
      const OldEndDate = new Date(OldTask.end_date);
      const OldPrevtartDate = new Date(OldTask.prev_start);
      const OldPrevEndDate = new Date(OldTask.prev_end);
      /*if(OldPrevtartDate.getTime() != gantt.getTask(lastAction.taskid).start_date.getTime() ||
      OldStartDate.getTime() != OldPrevtartDate.getTime() ||
      OldPrevEndDate.getTime() != gantt.getTask(lastAction.taskid).end_date.getTime() ||
      OldEndDate.getTime() != OldPrevEndDate.getTime())*/
      {
        OldTask.prev_start = OldPrevtartDate
          OldTask.start_date = OldStartDate
          OldTask.prev_end = OldPrevEndDate;
        OldTask.end_date = OldEndDate;
        gantt.updateTask(lastAction.taskid, OldTask);
        sessionStorage.removeItem("redoactionupdate");
      }
      break;
    case "delete":
      gantt.deleteTask(lastAction.task.id);
      break;
    case "deleteLink":
      gantt.deleteLink(lastAction.task.id);
      Ext.getStore('gantt.undo.store').add(lastActionRecord);
      break;
    }
    Ext.getStore('gantt.redo.store').remove(lastActionRecord);
  }

}

let tGridFilters = {};
let WOFieldsAttributes = {};

Ext.define('EAM.custom.external_DUPLGD', {
  extend: 'EAM.custom.AbstractExtensibleFramework',
  getSelectors: function () {
    var vBoilerList = [];
    var vProjectList;
    var vEmpSched;
    var vSupplierList;
    // Liste des tÃ¢ches Ã  traiter par le plug-in.
    var ArrEvents = [];
    var today = new Date();
    var vModalWindowIsOpen = false;
    var vIsWOScreenOpened = false;
    var resData;
    _ScaleDateArray1 = [];
    _ScaleDateArray2 = [];
    var dMaxDate = new Date();
    var vListFields = [];
    var vGridSize = 528;
    let undoStack = [];
    let redoStack = [];
    let Link_data = [];
    let Link_removedata = [];

    if (Ext.getStore('gantt.undo.store')) {
      Ext.getStore('gantt.undo.store').destroy()
    }
    Ext.create('Ext.data.Store', {
      id: 'gantt.undo.store',
      fields: [],
      data: []
    });

    if (Ext.getStore('gantt.redo.store')) {
      Ext.getStore('gantt.redo.store').destroy()
    }
    Ext.create('Ext.data.Store', {
      id: 'gantt.redo.store',
      fields: [],
      data: []
    });

    sessionStorage.removeItem("undoactionupdate");
    sessionStorage.removeItem("undoactionupdateLink");
    sessionStorage.removeItem("redoactionupdate");
    sessionStorage.removeItem("redoactionupdateId");

    var vFirstDayOfWeek = parseInt(EAM.AppData._appconfig.map.firstdayofweek)
      var t = []
      t[1] = [0, 6]
      t[2] = [0, 1]
      t[3] = [1, 2]
      t[4] = [2, 3]
      t[5] = [3, 4]
      t[6] = [4, 5]
      t[0] = [5, 6]
      var vDaysOfWe = t[vFirstDayOfWeek]
      var vListOfDaysOF = [];
    var vListOfDayTimeOF = [];
    var vListOfDayTimeOffDetail = [];
    var calGroups = []
    var calMap = new Map();
    var DateSpeList = []
    var DateSpeMap = new Map();
    var ExistingDateSpe = new Map();
    return {
      '#WSPLPA button[action=close]': {
        click: function () {
          var vPopUp = Ext.ComponentQuery.query('[isPopup=true]');
          vPopUp[0].close();
        }
      },
      '#BSALPG button[action=close]': {
        click: function () {
          ////console.log("close_BSALPG");
          var n_New_data = [];
          var vCurDataspy = Ext.getCmp('filter').value;
          var vCurDdsStillExists = false;
          var vPopUp = Ext.ComponentQuery.query('[isPopup=true]')
            if (vPopUp[0].gridMeta.GRIDNAME == "PUPRTK") {
              ////console.log("on ferme XUEQP1");
              var vDefaultDataspy = "";
              var n_New_data = [];
              vModalWindowIsOpen = false;
              try {
                var vUser = EAM.AppData.getInstallParams().get("user")
              } catch (err) {};
              if (!vUser) {
                var vUser = 'R5'
              };
              if (!vIsWOScreenOpened) {
                var vCurDataspy = Ext.getCmp('filter').value;
                var vCurDdsStillExists = false;
                var vListofWoDDs = EAM.Ajax.request({
                  url: "GRIDDATA",
                  params: {
                    SYSTEM_FUNCTION_NAME: "PUPRTK",
                    USER_FUNCTION_NAME: "PUPRTK",
                    MADDON_FILTER_ALIAS_NAME_1: "evt_code",
                    MADDON_FILTER_OPERATOR_1: "=",
                    MADDON_FILTER_JOINER_1: "AND",
                    MADDON_FILTER_SEQNUM_1: "1",
                    MADDON_FILTER_VALUE_1: '*'
                  }
                }).responseData;
                var ListOfDataspy = vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist_options;
                vDefaultDataspy = vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist;
                if (!vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist_options[0]) {
                  if (vCurDataspy.toString() == ListOfDataspy.option.value.toString()) {
                    vCurDdsStillExists = true;
                  }
                  n_New_data.push(new Ext.data.Record({
                      code: ListOfDataspy.option.value,
                      description: ListOfDataspy.option.display
                    }));
                } else {
                  for (i = 0; i < ListOfDataspy.length; i++) {
                    if (vCurDataspy.toString() == ListOfDataspy[i].value.toString()) {
                      vCurDdsStillExists = true;
                    }
                    n_New_data.push(new Ext.data.Record({
                        code: ListOfDataspy[i].value,
                        description: ListOfDataspy[i].display
                      }));
                  }
                }
                Ext.getCmp('filter').getStore().removeAll();
                for (var i = 0; i < n_New_data.length; i++) {
                  Ext.getCmp('filter').getStore().add({
                    code: n_New_data[i].data.code,
                    description: n_New_data[i].data.description
                  });

                }

                if (!vCurDdsStillExists) {
                  Ext.getCmp('filter').setValue(vDefaultDataspy);
                }
              }
              vIsWOScreenOpened = false;
            }
            vPopUp[0].close();

        }
      },
      'ewsusr listonly[tabName=LST] tableview': {
        afterrender: function () {
          //console.log("afterrender tableview 1");
        },
        beforedestroy: function () {
          //console.log("on detruit la grille tableview 1");
        }
      },
      'ewsusr listview readonlygrid tableview': {
        afterrender: function () {
          //console.log("afterrender tableview");
        },
        beforedestroy: function () {
          //console.log("on detruit la grille tableview");
        }
      },
      'ewsusr listonly[tabName=LST]': {
        beforedestroy: function () {
          //console.log("on detruit la grille");
        },
        lovpop_close: function (c, a) {
          var vFormPanel = EAM.Utils.getCurrentTab().getFormPanel();

          if (c.field == "act_udfchar01") {

            Ext.getCmp("act_udfchar01").setValue(vFormPanel.getRecord().get("act_udfchar01"));

          }

          if (c.field == "woupd_assignto") {

            Ext.getCmp("woupd_assignto").setValue(vFormPanel.getRecord().get("woupd_assignto"));

          }

        },
        hyperlinkclosed: function (a, b, c, d) {
          ////console.log("hyperlinkclosed");

          var vDefaultDataspy = "";
          var n_New_data = [];

          vModalWindowIsOpen = false;
          try {
            var vUser = EAM.AppData.getInstallParams().get("user")
          } catch (err) {};
          if (!vUser) {
            var vUser = 'R5'
          };
          if (!vIsWOScreenOpened) {
            var vListofWoDDs = EAM.Ajax.request({
              url: "GRIDDATA",
              params: {
                SYSTEM_FUNCTION_NAME: "PUPRTK",
                USER_FUNCTION_NAME: "PUPRTK",
                MADDON_FILTER_ALIAS_NAME_1: "evt_code",
                MADDON_FILTER_OPERATOR_1: "=",
                MADDON_FILTER_JOINER_1: "AND",
                MADDON_FILTER_SEQNUM_1: "1",
                MADDON_FILTER_VALUE_1: '*'
              }
            }).responseData;
            var vCurDataspy = Ext.getCmp('filter').value;
            var vCurDdsStillExists = false;

            var ListOfDataspy = vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist_options;
            vDefaultDataspy = vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist;
            if (!vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist_options[0]) {
              n_New_data.push(new Ext.data.Record({
                  code: ListOfDataspy.option.value,
                  description: ListOfDataspy.option.display
                }));
            } else {
              for (i = 0; i < ListOfDataspy.length; i++) {
                if (vCurDataspy.toString() == ListOfDataspy[i].value.toString()) {
                  vCurDdsStillExists = true;
                }
                n_New_data.push(new Ext.data.Record({
                    code: ListOfDataspy[i].value,
                    description: ListOfDataspy[i].display,
                    id: ListOfDataspy[i].value

                  }));
              }
            }

            Ext.getCmp('filter').getStore().removeAll();

            for (var i = 0; i < n_New_data.length; i++) {
              Ext.getCmp('filter').getStore().add({
                code: n_New_data[i].data.code,
                description: n_New_data[i].data.description
              });

            }
            if (!vCurDdsStillExists) {
              Ext.getCmp('filter').setValue(vDefaultDataspy);
            }

          }
          vIsWOScreenOpened = false;
          refreshColumnfilter();
        },
        beforerender: function (a, b, c, d) {
          ////console.log("testbefore_ewsusr");

          clear_CustomComp();
          var vLoad = EAM.Ajax.request({
            url: "BSUDSC",
            messagingOptions: {
              deferConfirm: !0,
              deferWarning: !0,
              deferError: !0
            },
            params: {
              SYSTEM_FUNCTION_NAME: "BSUDSC",
              USER_FUNCTION_NAME: "BUDUSR",
              CURRENT_TAB_NAME: null,
              FUNCTION_CLASS: "WEBD",
              removescreenflows: "yes",
              MENU_MODULE_KEY: 0
            }
          })

            var vLoad = EAM.Ajax.request({
              url: "BSUDSC?USER_FUNCTION_NAME=XUJVCS&FUNCTION_CLASS=WEBD",
              messagingOptions: {
                deferConfirm: !0,
                deferWarning: !0,
                deferError: !0
              },
              params: {
                SYSTEM_FUNCTION_NAME: "BSUDSC",
                USER_FUNCTION_NAME: "XUJVCS",
                CURRENT_TAB_NAME: null,
                FUNCTION_CLASS: "WEBD",
                removescreenflows: "yes",
                MENU_MODULE_KEY: 0
              }
            })

          function LoadFileToBody(fileName, fileType, sourceType) {
            if (document.getElementById(fileName + "_" + fileType)) {
              document.getElementsByTagName("head")[0].removeChild(document.getElementById(fileName + "_" + fileType));
            }
            var nodeDHTML = document.createElement(sourceType);

            var vFile = EAM.Ajax.request({
              url: "BSUDSC.HDR",
              params: {
                SYSTEM_FUNCTION_NAME: "BSUDSC",
                USER_FUNCTION_NAME: "XUJVCS",
                CURRENT_TAB_NAME: "HDR",
                wspf_10_source_code: fileName,
                pagemode: "view",
                SCROLLROW: "YES",
                ONLY_DATA_REQUIRED: "true"
              }
            }).responseData.pageData.values.wspf_10_source_stmt;

            if (fileType == "js") {
              var _elementScript = document.getElementsByTagName("script")
                for (var i = 0; i < _elementScript.length; i++) {
                  if (_elementScript[i].id) {
                    if (_elementScript[i].id == fileName + "_dhtmlx_" + fileType) {
                      document.getElementsByTagName("head")[0].removeChild(document.getElementById(fileName + "_dhtmlx_" + fileType));
                    }
                  }
                }
            }
            if (fileType == "css") {
              var _elementScript = document.getElementsByTagName("style")
                for (var i = 0; i < _elementScript.length; i++) {
                  if (_elementScript[i].id) {
                    if (_elementScript[i].id == fileName + "_dhtmlx_" + fileType) {
                      document.getElementsByTagName("head")[0].removeChild(document.getElementById(fileName + "_dhtmlx_" + fileType));
                    }
                  }
                }
            }

            nodeDHTML.type = "text/" + fileType;
            nodeDHTML.id = fileName + "_dhtmlx_" + fileType;
            nodeDHTML.setAttribute("cust_object", "shutdown_planning");
            nodeDHTML.innerHTML = vFile;
            document.getElementsByTagName("head")[0].appendChild(nodeDHTML)
          }
          var _elementStyle = document.getElementsByTagName("style")
            var vListOfStyleToDelete = [];

          for (var i = 0; i < _elementStyle.length; i++) {
            if (_elementStyle[i].id) {
              if (_elementStyle[i].id.indexOf("dhtmlx") > -1) {
                vListOfStyleToDelete.push(_elementStyle[i].id);
              }
            }
          }

          if (vListOfStyleToDelete.length > 0) {
            for (var i = 0; i < vListOfStyleToDelete.length; i++) {
              document.getElementsByTagName("head")[0].removeChild(document.getElementById(vListOfStyleToDelete[i]));
            }
          }

          var _elementScript = document.getElementsByTagName("script")
            var vListOfScriptToDelete = [];

          for (var i = 0; i < _elementScript.length; i++) {
            if (_elementScript[i].id) {
              if (_elementScript[i].id.indexOf("dhtmlx") > -1) {
                ////console.log("on supprime " + _elementScript[i].id)
                vListOfScriptToDelete.push(_elementScript[i].id);
              }
            }
          }

          if (vListOfScriptToDelete.length > 0) {
            for (var i = 0; i < vListOfScriptToDelete.length; i++) {
              document.getElementsByTagName("head")[0].removeChild(document.getElementById(vListOfScriptToDelete[i]));
            }
          }

          LoadFileToBody("DHTMLXGANTT_S", "javascript", "script");
          LoadFileToBody("DHTMLXGANTT_UNDO_S", "javascript", "script");
          LoadFileToBody("DHTMLXGANTT_KEYBOARD_NAV_S", "javascript", "script");
          LoadFileToBody("GANTT_LOCALE_S", "javascript", "script");
          LoadFileToBody("API_S", "javascript", "script");
          LoadFileToBody("DHTMLXGANTT_TOOLTIP_S", "javascript", "script");
          //LoadFileToBody("DHTMLXGANTT_SMART_RENDERING","javascript","script");
          LoadFileToBody("DHTMLXGANTT_MARKER_S", "javascript", "script");
          LoadFileToBody("DHTMLXGANTT_SKYBLUE_CSS_S", "css", "style");
          LoadFileToBody("GANTT_CUSTOM_CSS_S", "css", "style");
          LoadFileToBody("XLSXPOPULATE", "javascript", "script");
          LoadFileToBody("FILESAVER", "javascript", "script");

        },
        beforedestroy: function (a, b, c, d) {
          //console.log("testbeforedestroy_ewsuser");
        },
        afterrender: function (a, b, c, d) {
          ////console.log("testafterrender_ewsuser");
          try {
            if (EAM.Utils.getScreen().userFunction == 'DUPLGD' && Ext.ComponentQuery.query('uxtabpanel')[0]) {

              var vRecordWOAttributes = EAM.Ajax.request({
                url: "WSJOBS.HDR",
                params: {
                  SYSTEM_FUNCTION_NAME: "WSJOBS",
                  USER_FUNCTION_NAME: "WSJOBS",
                  CURRENT_TAB_NAME: "HDR",
                  CHECK_CF_CHANGEFLAG: true,
                  projectCodenum: null,
                  organization: null,
                  pagemode: "view"
                }
              });
              WOFieldsAttributes = {};

              if (vRecordWOAttributes.success) {
                if (EAM.Utils.propertyExists(vRecordWOAttributes, 'responseData.pageData.attributes')) {
                  for (var key in vRecordWOAttributes.responseData.pageData.attributes) {

                    WOFieldsAttributes[key] = vRecordWOAttributes.responseData.pageData.attributes[key]

                  }
                }

              }

              var vFormPanel = EAM.Utils.getScreen().getCurrentTab().getFormPanel();
              //console.log("1")
              vFormPanel.gridFields.forEach(function (rec) {
                vBoilerList[rec.name] = rec.label
              })

              //clear_CustomComp();
              //console.log("2")
              try {
                Ext.ComponentQuery.query('uxtabpanel')[0].el.dom.style.height = "0px";
                ////console.log("step1");
                var referencenode = Ext.ComponentQuery.query('uxtabpanel')[0].up().body.dom;
                ////console.log("step2");
                vWidth = referencenode.clientWidth;
                vHeigh = referencenode.clientHeight;
                ////console.log("step3");
              } catch (e) {
                ////console.log("error when retriving data uxtabpanel")
              }

              sessionStorage.removeItem("redoactionupdate");
              sessionStorage.removeItem("undoactionupdate");

              var vGlobalDiv = document.createElement("div");
              vGlobalDiv.id = "custom_global_div";
              vGlobalDiv.setAttribute("cust_object", "shutdown_planning");
              vGlobalDiv.style.width = '100%';
              vGlobalDiv.style.height = '100%';
              referencenode.appendChild(vGlobalDiv);
              ////console.log("step7");

              Ext.create('Ext.panel.Panel', {
                width: "100%",
                height: "100%",
                layout: 'border',
                id: "cust_cont_main",
                cust_object: "shutdown_planning",
                renderTo: 'custom_global_div',
                defaults: {
                  collapsible: true,
                  split: true,
                  bodyStyle: 'padding:5px'
                },
                items: [{
                    //title: 'Filtre',
                    id: "custom-div",
                    region: 'north',
                    cust_object: "shutdown_planning",
                    xtype: 'panel',
                    split: true,
                    width: '100%',
                    height: '20%'
                  }, {
                    //title: 'Filtre',
                    id: "gantt_here_cont",
                    cust_object: "shutdown_planning",
                    split: false,
                    collapsible: false,
                    xtype: 'panel',
                    width: '100%',
                    layout: 'fit',
                    region: 'center'
                  }
                ]

              });

              var node2 = document.createElement("div");
              node2.id = 'gantt_here';
              node2.setAttribute("cust_object", "shutdown_planning");
              //referencenode.childNodes[0].style.height = vWidth + 'px';
              node2.style.width = '100%';
              node2.style.height = '100%';
              //node.style.top = '0px';
              Ext.getCmp("gantt_here_cont").body.appendChild(node2);

              if (Ext.getStore('gantt.period.store')) {
                Ext.getStore('gantt.period.store').destroy();
              }
              if (Ext.getStore('gantt.viewmode.store')) {
                Ext.getStore('gantt.viewmode.store').destroy();
              }
              if (Ext.getStore('gantt.hoursmode.store')) {
                Ext.getStore('gantt.hoursmode.store').destroy();
              }
              if (Ext.getStore('gantt.minutescale.store')) {
                Ext.getStore('gantt.minutescale.store').destroy();
              }

              var vPeriodStore = Ext.create('Ext.data.Store', {
                id: 'gantt.period.store',
                fields: ['code', 'description'],
                data: [{
                    "code": "Month",
                    "description": vBoilerList["header_periodmonth"]
                  }, {
                    "code": "Week",
                    "description": vBoilerList["header_periodweek"]
                  }, {
                    "code": "Quarter",
                    "description": vBoilerList["header_periodquarter"]
                  }, {
                    "code": "Halfyear",
                    "description": vBoilerList["header_periodhalfyear"]
                  }, {
                    "code": "Year",
                    "description": vBoilerList["header_periodyear"]
                  }, {
                    "code": "2Year",
                    "description": vBoilerList["header_period2year"]
                  }
                ]
              });

              var vViewModeStore = Ext.create('Ext.data.Store', {
                id: 'gantt.viewmode.store',
                fields: ['code', 'description'],
                data: [{
                    "code": "1",
                    "description": vBoilerList["header_hourly"]
                  }, {
                    "code": "2",
                    "description": vBoilerList["header_weekly"]
                  }, {
                    "code": "3",
                    "description": vBoilerList["header_monthly"]
                  }, {
                    "code": "4",
                    "description": vBoilerList["header_yearly"]
                  }, {
                    "code": "5",
                    "description": vBoilerList["header_week_number"]
                  }
                ]
              });
              var vMinuteStore = Ext.create('Ext.data.Store', {
                id: 'gantt.minutescale.store',
                fields: ['code', 'description'],
                data: [{
                    'code': '1',
                    'description': '1'
                  }, {
                    'code': '15',
                    'description': '15'
                  }, {
                    'code': '30',
                    'description': '30'
                  }, {
                    'code': '60',
                    'description': '60'
                  }
                ]
              });

              var vHoursStore = Ext.create('Ext.data.Store', {
                id: 'gantt.hoursmode.store',
                fields: ['code', 'description'],
                data: [{
                    'code': '0',
                    'description': '00'
                  }, {
                    'code': '1',
                    'description': '01'
                  }, {
                    'code': '2',
                    'description': '02'
                  }, {
                    'code': '3',
                    'description': '03'
                  }, {
                    'code': '4',
                    'description': '04'
                  }, {
                    'code': '5',
                    'description': '05'
                  }, {
                    'code': '6',
                    'description': '06'
                  }, {
                    'code': '7',
                    'description': '07'
                  }, {
                    'code': '8',
                    'description': '08'
                  }, {
                    'code': '9',
                    'description': '09'
                  }, {
                    'code': '10',
                    'description': '10'
                  }, {
                    'code': '11',
                    'description': '11'
                  }, {
                    'code': '12',
                    'description': '12'
                  }, {
                    'code': '13',
                    'description': '13'
                  }, {
                    'code': '14',
                    'description': '14'
                  }, {
                    'code': '15',
                    'description': '15'
                  }, {
                    'code': '16',
                    'description': '16'
                  }, {
                    'code': '17',
                    'description': '17'
                  }, {
                    'code': '18',
                    'description': '18'
                  }, {
                    'code': '19',
                    'description': '19'
                  }, {
                    'code': '20',
                    'description': '20'
                  }, {
                    'code': '21',
                    'description': '21'
                  }, {
                    'code': '22',
                    'description': '22'
                  }, {
                    'code': '23',
                    'description': '23'
                  }
                ]
              });

              ////console.log("step8");

              var vDefaultDataspy = "";
              try {
                var vUser = EAM.AppData.getInstallParams().get("user")
              } catch (err) {};
              if (!vUser) {
                var vUser = 'R5'
              };

              if (Ext.getStore('gantt.dataspy.store')) {
                Ext.getStore('gantt.dataspy.store').destroy();
              }
              var vDdsStore = Ext.create('Ext.data.Store', {
                id: 'gantt.dataspy.store',
                fields: ['code', 'description'],
                data: []
              });

              ////console.log("step9");

              // Madhu : TOdo
              var n_New_data = [];

              var vListofWoDDs = EAM.Ajax.request({
                url: "GRIDDATA",
                params: {
                  USER_FUNCTION_NAME: "PUPRTK",
                  IGNORE_CUSTOMFIELDS: 'YES',
                  CACHE_REQUEST: false,
                  GRID_NAME: "PUPRTK",
                  FETCH_LABELS: true,
                  COMPONENT_INFO_TYPE: 'EDIT_INFO',
                  GRID_TYPE: '',
                  DATASPY_FILTER: '',
                  SKIP_DELEGATE: false
                }
              }).responseData;

              var ListOfDataspy = vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist_options;
              vDefaultDataspy = vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist;
              if (!vListofWoDDs.pageData.grid.GRIDRESULT.TOOLBAR.FIELDVALUES.ROW.dataspylist_options[0]) {
                n_New_data.push(new Ext.data.Record({
                    code: ListOfDataspy.option.value,
                    description: ListOfDataspy.option.display
                  }));
              } else {
                for (i = 0; i < ListOfDataspy.length; i++) {
                  n_New_data.push(new Ext.data.Record({
                      code: ListOfDataspy[i].value,
                      description: ListOfDataspy[i].display

                    }));
                }
              }

              vDdsStore.add(n_New_data);

              Ext.define('INFORGLOBALS', {
                mod: "collapse",
                refreshresourcegrid: true
              });

              INFORGLOBALS.mod = "expand";
              INFORGLOBALS.refreshresourcegrid = true;

              try {
                var vUser = EAM.AppData.getInstallParams().get("user")
              } catch (err) {};
              if (!vUser) {
                var vUser = 'R5'
              };
              var vExistingSave = EAM.Ajax.request({
                url: "GRIDDATA",
                messagingOptions: {
                  deferConfirm: !0,
                  deferWarning: !0,
                  deferError: !0
                },
                params: {
                  SYSTEM_FUNCTION_NAME: "1UGFSV",
                  USER_FUNCTION_NAME: "1UGFSV",
                  MADDON_FILTER_ALIAS_NAME_1: "wspf_10_user_code",
                  MADDON_FILTER_OPERATOR_1: "=",
                  MADDON_FILTER_JOINER_1: "AND",
                  MADDON_FILTER_SEQNUM_1: "1",
                  MADDON_FILTER_VALUE_1: vUser
                }
              });

              var PeriodStartTime = "8";
              var PeriodMinute = "15"
                var PeriodEndTime = "18";
              var PostPoneOp = true;

              var HighLightCollision = false;
              var ShowExpired = false;
              var ShowHours = false;

              var vStartViewMode = "2";
              var ShowExpired = false;

              var HighLightCollision = false;
              var Expandcollapse = false;
              var vPeriodDftValue = "Month";
              var vSaveDataspy = vDefaultDataspy;
              vGridSize = 528;
              if (PeriodStartTime == "") {
                PeriodStartTime = "8"
              }
              if (PeriodMinute == "") {
                PeriodMinute = "15"
              }
              if (PeriodEndTime == "") {
                PeriodEndTime = "18"
              }

              if (vExistingSave.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
                var vRecord2 = EAM.Ajax.request({
                  url: "BSUDSC.HDR",
                  messagingOptions: {
                    deferConfirm: !0,
                    deferWarning: !0,
                    deferError: !0
                  },
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSUDSC",
                    USER_FUNCTION_NAME: "1UGFSV",
                    CURRENT_TAB_NAME: "HDR",
                    wspf_10_user_code: vUser,
                    SCROLLROW: "YES",
                    pagemode: "view"
                  }
                });

                if (vRecord2.success) {
                  if (EAM.Utils.propertyExists(vRecord2, "responseData.pageData.values")) {
                    var vRecord = vRecord2.responseData.pageData.values;

                    var ShowToolTip = false;
                    var vPeriodDftValue = "Month";
                    var vSaveDataspy = vDefaultDataspy;
                    var vListOfType = []
                    vSaveDataspy = vRecord["wspf_10_dataspy"];
                    var vDdsExists = false;
                    Ext.getStore("gantt.dataspy.store").data.items.forEach(function (rec) {
                      if (rec.data.code.toString() === vSaveDataspy.toString()) {
                        vDdsExists = true;
                      }
                    })
                    if (!vDdsExists) {
                      vSaveDataspy = vDefaultDataspy;
                    }

                    // Madhu - Shift Amazon addition
                    //var vShiftSaveDataspy = vDefaultDataspy;
                    vShiftSaveDataspy = vRecord["wspf_10_shiftdataspy"];
                    INFORGLOBALS.mod = vRecord["wspf_10_expand_collapse"];
                    vPeriodDftValue = vRecord["wspf_10_period"];
                    vStartViewMode = vRecord["wspf_10_view_scale"];
                    if (vRecord["wspf_10_expired_dates"] == "+") {
                      ShowExpired = true;
                    } else {
                      ShowExpired = false;
                    }

                    if (vRecord["wspf_10_show_hours"] == "+") {
                      ShowHours = true;
                    } else {
                      ShowHours = false;
                    }
                    if (vRecord["wspf_10_show_tooltip"] == "+") {
                      ShowToolTip = true;
                    } else {
                      ShowToolTip = false;
                    }
                    if (vRecord["wspf_10_highlight_collision"] == "+") {
                      HighLightCollision = true;
                    } else {
                      HighLightCollision = false;
                    }

                    if (vRecord["wspf_10_postpone_op"] == "+") {
                      PostPoneOp = true;
                    } else {
                      PostPoneOp = false;
                    }
                    PeriodStartTime = vRecord["wspf_10_start_time_period"] || "8";
                    PeriodMinute = vRecord["wspf_10_minute_scale"] || "15";
                    PeriodEndTime = vRecord["wspf_10_end_time_period"] || "18";
                    if (PeriodStartTime == "") {
                      PeriodStartTime = "8"
                    }
                    if (PeriodMinute == "") {
                      PeriodMinute = "15"
                    }
                    if (PeriodEndTime == "") {
                      PeriodEndTime = "18"
                    }

                  }

                }

              } else {
                var vStartViewMode = "2";
                var ShowExpired = false;

                var HighLightCollision = false;
                var Expandcollapse = false;
                var vPeriodDftValue = "Month";
                var vSaveDataspy = vDefaultDataspy;
                vGridSize = 528;
                if (PeriodStartTime == "") {
                  PeriodStartTime = "8"
                }
                if (PeriodMinute == "") {
                  PeriodMinute = "15"
                }
                if (PeriodEndTime == "") {
                  PeriodEndTime = "18"
                }
              }
              Ext.create('Ext.panel.Panel', {
                id: 'gantt_area_div',
                width: '100%',
                height: '100%',
                cust_object: 'shutdown_planning',
                listeners: {
                  afterrender: function (cmp) {
                    ////console.log("afterrender_gantt_area_div");
                  },
                  resize: function (cmp, width, height) {
                    ////console.log("afterrender_gantt_area_div");
                  },
                  beforedestroy: function (a, b, c) {
                    //	//console.log("beforedestroy_gantt_area_div");
                  }
                },
                renderTo: 'gantt_here'
              });

              var sDateSpeStore = Ext.getStore('gantt.datespetype.store')

                var vToolBar = Ext.create('Ext.toolbar.Toolbar', {
                  id: "gantt_filter",
                  width: '100%',
                  height: 40,
                  cust_object: 'shutdown_planning',
                  overflowHandler: 'menu',
                  items: [{
                      xtype: "customtrigger",
                      //fieldLabel: "Serial Number*",
                      maxLength: 50,
                      size: 30,
                      id: "searchgantt",
                      margin: '5 0 0 5',
                      emptyText: vBoilerList["header_search"],
                      listeners: {
                        afterrender: function () {
                          Ext.getElementById('searchgantt-trigger-trigger').addEventListener('click', function (e) {
                            searchGantt()
                          });
                        },
                        specialkey: function (f, e) {
                          if (e.getKey() == e.ENTER) {
                            //console.log('Spacial Key = Enter');
                            searchGantt()
                          }
                        }
                      },
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer1',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'checkbox',
                      fieldLabel: vBoilerList["header_expired"],
                      style: {
                        display: 'flex',
                        alignItems: 'center',
                      },
                      inputValue: '1',
                      id: 'ShowExpired',
                      labelAlign: 'right',
                      hidden: false,
                      checked: ShowExpired,
                      margin: '0 0 0 0',
                      listeners: {
                        change: function () {
                          BeForechangeFilter();
                        }
                      },
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer2',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'combobox',
                      store: vPeriodStore,
                      queryMode: 'local',
                      displayField: 'description',
                      labelAlign: 'right',
                      valueField: 'code',
                      value: vPeriodDftValue,
                      id: "period",
                      margin: '0 0 0 0',
                      listeners: {
                        change: function () {
                          BeForechangeFilter();
                        }
                      },
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer3',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'uxdate',
                      anchor: '100%',
                      size: 15,
                      //fieldLabel: 'From',
                      id: 'StartDate',
                      value: new Date(),
                      //format: "d/m/y",
                      margin: '5 0 0 5',
                      listeners: {
                        change: function () {
                          BeForechangeFilter();
                        }
                      },
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer4',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'button',
                      //iconCls: 'toolbarReset',
                      text: vBoilerList["button_refresh"],
                      margin: '5 0 0 5',
                      id: "refreshGridbtn",
                      uftId: "refreshGridbtn",
                      name: "refreshGridbtn",
                      handler: function (e) {
                        EAM.Utils.mask(Ext.ComponentQuery.query('#custom_global_div')[0]);
                        Ext.getStore('gantt.undo.store').removeAll();
                        Ext.getStore('gantt.redo.store').removeAll();
                        var vSave = document.getElementById("savebtn");
                        vSave.style.background = "";
                        tGridFilters = {};
                        Link_removedata = [];
                        undoStack = [];
                        redoStack = [];

                        changeFilter();
                      },
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer5',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'combobox',
                      store: vDdsStore,
                      width: 300,
                      queryMode: 'local',
                      displayField: 'description',
                      valueField: 'code',
                      value: vSaveDataspy,
                      id: "filter",
                      margin: '5 0 0 5',
                      listeners: {
                        change: function () {
                          //console.log("on change le dds");
                          Ext.getStore('gantt.undo.store').removeAll();
                          Ext.getStore('gantt.redo.store').removeAll();
                          undoStack = [];
                          redoStack = [];
                          Link_removedata = [];
                          changeFilter();

                        }
                      },
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'button',
                      text: vBoilerList["button_edit"],
                      margin: '5 0 0 5',
                      id: "editbtn",
                      ui: "tertiary-small",
                      handler: function () {
                        var vParams = {
                          'USER_FUNCTION_NAME': "BSALPG",
                          'gridname': "PUPRTK"
                        };

                        Ext.create('EAM.view.common.popups.Grid', {
                          width: 1500,
                          height: 900,
                          cust_object: 'shutdown_planning',
                          id: 'custom_viewgrid',
                          resizable: !0,
                          displayDataspy: !0,
                          url: 'BSALPG',
                          itemId: 'BSALPG',
                          popCaption: "",
                          popTitle: "",
                          screen: EAM.Utils.getScreen(),
                          callingPanel: EAM.Utils.getScreen().getCurrentTab().getFormPanel(),
                          params: vParams,
                          dialogButtons: ['close'],
                          closable: !1
                        }).show()

                      },
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer6',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'button',
                      text: vBoilerList["button_save"],
                      margin: '5 0 0 5',
                      id: "savebtn",
                      handler: function () {
                        Ext.getStore('gantt.undo.store').removeAll();
                        Ext.getStore('gantt.redo.store').removeAll();
                        undoStack = [];
                        redoStack = [];
                        updateEAM();
                      },
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer13',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'button',
                      text: vBoilerList["button_exporttopng"],
                      margin: '5 0 0 5',
                      id: "exporttopng",
                      handler: function () {
                        exportToPNG();
                      },
                    },{
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer13',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'button',
                      text: vBoilerList["button_exporttopdf"],
                      margin: '5 0 0 5',
                      id: "exporttopdf",
                      handler: function () {
                        exportToPDF();
                      },
                    }, 
					{
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer13',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'button',
                      iconCls: 'toolbarReset',
                      margin: '0 0 0 0',
                      uftId: "cust_undo_sched",
                      id: "cust_undo_btn",
                      name: "cust_undo_btn",
                      cust_object: "shutdown_planning",
                      tooltip: "undo",
                      handler: function () {
                        undo(undoStack, redoStack);
                        console.log("undo");
                      },
                    }, {
                      xtype: 'button',
                      iconCls: 'toolbarReset',
                      margin: '0 0 0 0',
                      uftId: "cust_redo_sched",
                      id: "cust_redo_btn",
                      name: "cust_redo_btn",
                      cust_object: "shutdown_planning",
                      tooltip: "redo",
                      handler: function () {
                        //undo(undoStack, redoStack);
                        redo(undoStack, redoStack);
                        console.log("redo");
                      },
                      listeners: {
                        afterrender: function (btn) {
                          // Apply the transformation to the icon element
                          var iconEl = btn.el.dom.querySelector('.toolbarReset');
                          if (iconEl) {
                            iconEl.style.transform = 'scaleX(-1)';
                          }
                        }
                      }
                    }, {
                      xtype: 'tbspacer',
                      width: 40,
                      id: 'tbspacer28',
                      cust_object: "shutdown_planning"
                    }, {
                      xtype: 'button',
                      iconCls: 'exportExcel',
                      margin: '0 0 0 0',
                      uftId: "cust_exportXlsBtn",
                      id: "cust_exportXlsBtn",
                      name: "cust_exportXlsBtn",
                      handler: function () {
                        cust_exportToExcel(vBoilerList);
                      },
                      tooltip: vBoilerList["toolbar_excel_tooltip"]
                    }
                  ]
                  /*,
                  renderTo: 'custom-div'*/
                });

              Ext.getCmp("custom-div").add(vToolBar)

              var vToolBar2 = Ext.create('Ext.toolbar.Toolbar', {
                id: "gantt_filter_2",
                width: '100%',
                height: 40,
                overflowHandler: 'menu',
                cust_object: 'shutdown_planning',
                items: [, {
                    xtype: 'combobox',
                    store: vViewModeStore,
                    queryMode: 'local',
                    displayField: 'description',
                    valueField: 'code',
                    value: vStartViewMode,
                    id: "viewmode_gantt",
                    margin: '5 0 0 5',
                    listeners: {
                      change: function (a, b, c) {
                        onScaleChange(b);
                      }
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'tbspacer',
                    width: 40,
                    id: 'tbspacer7',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'label',
                    id: 'label_min',
                    hidden: false,
                    text: vBoilerList["header_minute_scale"],
                    forId: "disp_minute_lbl",
                    margin: '5 0 0 5',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'combobox',
                    store: vMinuteStore,
                    //fieldLabel: gantt.locale.labels.header_endtime,
                    width: 50,
                    hidden: false,
                    queryMode: 'local',
                    displayField: 'description',
                    valueField: 'code',
                    value: PeriodMinute,
                    id: "disp_minute",
                    margin: '5 0 0 5',
                    listeners: {
                      change: function (a, b, c) {
                        gantt.config.time_step = Ext.getCmp("disp_minute").getValue();
                      }
                    },
                    cust_object: "shutdown_planning"

                  }, {
                    xtype: 'label',
                    id: 'label1',
                    hidden: false,
                    text: vBoilerList["header_starttime"],
                    forId: "disp_starttime_lbl",
                    margin: '5 0 0 5',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'combobox',
                    store: vHoursStore,
                    //fieldLabel: gantt.locale.labels.header_endtime,
                    width: 50,
                    hidden: false,
                    queryMode: 'local',
                    displayField: 'description',
                    valueField: 'code',
                    value: PeriodStartTime,
                    id: "disp_starttime",
                    margin: '5 0 0 5',
                    listeners: {
                      change: function (a, b, c) {
                        if (Ext.getCmp("viewmode_gantt").value == "1") {
                          onScaleChange("1");
                        }
                      }
                    },
                    cust_object: "shutdown_planning"

                  }, {
                    xtype: 'label',
                    id: 'label2',
                    hidden: false,
                    text: vBoilerList["header_endtime"],
                    forId: "disp_endtime_lbl",
                    margin: '5 0 0 5',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'combobox',
                    store: vHoursStore,
                    hidden: false,
                    //fieldLabel: gantt.locale.labels.header_endtime,
                    width: 50,
                    queryMode: 'local',
                    displayField: 'description',
                    valueField: 'code',
                    value: PeriodEndTime,
                    id: "disp_endtime",
                    margin: '5 0 0 5',
                    listeners: {
                      change: function (a, b, c) {
                        if (Ext.getCmp("viewmode_gantt").value == "1") {
                          onScaleChange("1");
                        }
                      }
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'tbspacer',
                    width: 40,
                    id: 'tbspacer8',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'checkbox',
                    fieldLabel: vBoilerList["chkbox_active_hours_display"],
                    inputValue: '1',
                    id: 'ShowHours',
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                    },
                    hidden: false,
                    labelAlign: 'right',
                    checked: ShowHours,
                    margin: '0 0 0 0',
                    listeners: {
                      change: function () {
                        //console.log("on affiche l'heure ou pas");
                        gantt.render();
                      }
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'tbspacer',
                    width: 40,
                    id: 'tbspacer9',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'checkbox',
                    fieldLabel: vBoilerList["decal_operation"],
                    inputValue: '1',
                    id: 'PostPoneOp',
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                    },
                    labelAlign: 'right',
                    checked: PostPoneOp,
                    margin: '0 0 0 0',
                    listeners: {
                      change: function () {
                        //console.log("on affiche l'heure ou pas");
                        if (sessionStorage.getItem("undoactionchangepostpone") == "OK") {
                          sessionStorage.removeItem("undoactionchangepostpone");
                        } else {
                          Ext.getStore('gantt.undo.store').add({
                            type: "changepostpone",
                            value: Ext.getCmp("PostPoneOp").getValue()
                          })
                        }
                        gantt.render();
                      }
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'tbspacer',
                    width: 40,
                    id: 'tbspacer10',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'checkbox',
                    fieldLabel: vBoilerList["chkbox_helptext"], //gantt.locale.labels.chkbox_active_hours_display,
                    inputValue: '1',
                    id: 'ShowToolTip',
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                    },
                    labelAlign: 'right',
                    checked: ShowToolTip,
                    margin: '0 0 0 0',
                    listeners: {
                      change: function () {
                        //console.log("on affiche l'heure ou pas");
                        //gantt.render();
                      }
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'tbspacer',
                    width: 40,
                    id: 'tbspacer14',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'checkbox',
                    fieldLabel: vBoilerList["header_highlight"],
                    inputValue: '1',
                    id: 'HighLightCollision',
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                    },
                    labelAlign: 'right',
                    hidden: false,
                    checked: HighLightCollision,
                    margin: '0 0 0 0',
                    listeners: {
                      change: function () {
                        gantt.render();
                      }
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'tbspacer',
                    width: 40,
                    id: 'tbspacer14_1',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'button',
                    text: INFORGLOBALS.mod == "expand" ? vBoilerList["collapse"] : vBoilerList["expand"],
                    margin: '5 0 0 5',
                    id: "expcollbtn",
                    handler: function () {
                      ExpandcollapseTasks();
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'tbspacer',
                    width: 40,
                    id: 'tbspacer11',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'button',
                    text: vBoilerList["save_filter_data"],
                    margin: '5 0 0 5',
                    id: "saveFilter",
                    handler: function () {
                      saveFilter();
                    },
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'tbspacer',
                    width: 40,
                    id: 'tbspacer12',
                    cust_object: "shutdown_planning"
                  }, {
                    xtype: 'button',
                    text: vBoilerList["delete_filter_data"],
                    margin: '5 0 0 5',
                    id: "deleteFilter",
                    handler: function () {
                      deleteFilter();
                    },
                    cust_object: "shutdown_planning"
                  }
                ]
                /*,
                renderTo: 'custom-div'*/
              });

              Ext.getCmp("custom-div").add(vToolBar2)

              if (vDdsStore.data.length > 0) {
                getData();
              }

              function ExpandcollapseTasks() {
                gantt.eachTask(function (task) {
                  if (INFORGLOBALS.mod == "collapse" && task.type == "Project") {
                    task.$open = true;

                  } else {
                    if (task.type == "Project") {
                      task.$open = false;

                    }
                  }
                })
                if (INFORGLOBALS.mod == "collapse") {
                  INFORGLOBALS.mod = "expand";
                  Ext.getCmp('expcollbtn').setText(vBoilerList['collapse']);
                } else {
                  INFORGLOBALS.mod = "collapse";
                  Ext.getCmp('expcollbtn').setText(vBoilerList['expand']);
                }
                gantt.render();
              }

              function searchGantt() {
                //	//console.log("render");
                gantt.render();
                refreshColumnfilter();
              }

              function BeForechangeFilter() {
                var vRefresh = document.getElementById("refreshGridbtn");
                vRefresh.style.background = "lightgreen";
              }

              function deleteFilter() {
                ////console.log("deleteFilter");

                try {
                  var vUser = EAM.AppData.getInstallParams().get("user")
                } catch (err) {};
                if (!vUser) {
                  var vUser = 'R5'
                };
                var vExistingSave = EAM.Ajax.request({
                  url: "GRIDDATA",
                  params: {
                    SYSTEM_FUNCTION_NAME: "1UGFSV",
                    USER_FUNCTION_NAME: "1UGFSV",
                    MADDON_FILTER_ALIAS_NAME_1: "wspf_10_user_code",
                    MADDON_FILTER_OPERATOR_1: "=",
                    MADDON_FILTER_JOINER_1: "AND",
                    MADDON_FILTER_SEQNUM_1: "1",
                    MADDON_FILTER_VALUE_1: vUser
                  }
                });

                if (vExistingSave.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
                  var vLoad = EAM.Ajax.request({
                    url: "BSUDSC",
                    messagingOptions: {
                      deferConfirm: !0,
                      deferWarning: !0,
                      deferError: !0
                    },
                    params: {
                      SYSTEM_FUNCTION_NAME: "BSUDSC",
                      USER_FUNCTION_NAME: "1UGFSV",
                      CURRENT_TAB_NAME: null,
                      FUNCTION_CLASS: "WEBD",
                      removescreenflows: "yes",
                      MENU_MODULE_KEY: 0
                    }
                  })
                    var vRecord = EAM.Ajax.request({
                      url: "BSUDSC.HDR",
                      params: {
                        SYSTEM_FUNCTION_NAME: "BSUDSC",
                        USER_FUNCTION_NAME: "1UGFSV",
                        CURRENT_TAB_NAME: "HDR",
                        wspf_10_user_code: vUser,
                        SCROLLROW: "YES",
                        pagemode: "view"
                      }
                    }).responseData.pageData.values;
                  vRecord["processaction"] = "delete";
                  vRecord["wspf_10_user_code"] = vUser;

                  var vStatus = EAM.Ajax.request({
                    url: "BSUDSC.HDR.deleterecord?pageaction=DELETE",
                    params: Ext.merge(vRecord, {
                      CHECK_CF_CHANGEFLAG: "true",
                      CURRENT_TAB_NAME: "HDR",
                      SYSTEM_FUNCTION_NAME: "BSUDSC",
                      USER_FUNCTION_NAME: "1UGFSV",
                      can_update: "true",

                    })
                  });
                  if (vStatus.success) {
                    var vMsg = vBoilerList["deletefilter_success_message"];
                    EAM.Messaging.showConfirmation(vMsg);
                  }
                }
              }

              function saveFilter() {
                ////console.log("saveFilter");
                var vScale = "";

                vScale = Ext.getCmp('viewmode_gantt').value;

                try {
                  var vUser = EAM.AppData.getInstallParams().get("user")
                } catch (err) {};
                if (!vUser) {
                  var vUser = 'R5'
                };
                var vExistingSave = EAM.Ajax.request({
                  url: "GRIDDATA",
                  params: {
                    SYSTEM_FUNCTION_NAME: "1UGFSV",
                    USER_FUNCTION_NAME: "1UGFSV",
                    MADDON_FILTER_ALIAS_NAME_1: "wspf_10_user_code",
                    MADDON_FILTER_OPERATOR_1: "=",
                    MADDON_FILTER_JOINER_1: "AND",
                    MADDON_FILTER_SEQNUM_1: "1",
                    MADDON_FILTER_VALUE_1: vUser
                  }
                });

                if (vExistingSave.responseData.pageData.grid.GRIDRESULT.GRID.DATA.length == 0) {
                  var vLoad = EAM.Ajax.request({
                    url: "BSUDSC",
                    messagingOptions: {
                      deferConfirm: !0,
                      deferWarning: !0,
                      deferError: !0
                    },
                    params: {
                      SYSTEM_FUNCTION_NAME: "BSUDSC",
                      USER_FUNCTION_NAME: "1UGFSV",
                      CURRENT_TAB_NAME: null,
                      FUNCTION_CLASS: "WEBD",
                      removescreenflows: "yes",
                      MENU_MODULE_KEY: 0
                    }
                  })

                    var vRecord = EAM.Ajax.request({
                      url: "BSUDSC.HDR",
                      params: {
                        SYSTEM_FUNCTION_NAME: "BSUDSC",
                        USER_FUNCTION_NAME: "1UGFSV",
                        CURRENT_TAB_NAME: "HDR",
                        wspf_10_user_code: "*",
                        SCROLLROW: "YES",
                        pagemode: "view"
                      }
                    }).responseData.pageData.values;
                  vRecord["processaction"] = "insert";
                  vRecord["wspf_10_user_code"] = vUser;
                  vRecord["wspf_10_period"] = Ext.getCmp('period').value;
                  vRecord["wspf_10_view_scale"] = vScale;
                  vRecord["wspf_10_dataspy"] = Ext.getCmp('filter').value;
                  vRecord["wspf_10_start_time_period"] = Ext.getCmp('disp_starttime').value;
                  vRecord["wspf_10_end_time_period"] = Ext.getCmp('disp_endtime').value;
                  vRecord["wspf_10_minute_scale"] = Ext.getCmp('disp_minute').value;
                  if (Ext.getCmp("HighLightCollision").checked) {
                    vRecord["wspf_10_highlight_collision"] = "+";
                  } else {
                    vRecord["wspf_10_highlight_collision"] = "-";
                  }
                  vRecord["wspf_10_expand_collapse"] = INFORGLOBALS.mod;
                  /*wspf_10_expired_dates */
                  if (Ext.getCmp("ShowExpired").checked) {
                    vRecord["wspf_10_expired_dates"] = "+";
                  } else {
                    vRecord["wspf_10_expired_dates"] = "-";
                  }
                  if (Ext.getCmp("ShowHours").checked) {
                    vRecord["wspf_10_show_hours"] = "+";
                  } else {
                    vRecord["wspf_10_show_hours"] = "-";
                  }
                  if (Ext.getCmp("ShowToolTip").checked) {
                    vRecord["wspf_10_show_tooltip"] = "+";
                  } else {
                    vRecord["wspf_10_show_tooltip"] = "-";
                  }
                  if (Ext.getCmp("PostPoneOp").checked) {
                    vRecord["wspf_10_postpone_op"] = "+";
                  } else {
                    vRecord["wspf_10_postpone_op"] = "-";
                  }
                  var vStatus = EAM.Ajax.request({
                    url: "BSUDSC.HDR.insertrecord?pageaction=SAVE",
                    params: Ext.merge(vRecord, {
                      CHECK_CF_CHANGEFLAG: "true",
                      CURRENT_TAB_NAME: "HDR",
                      SYSTEM_FUNCTION_NAME: "BSUDSC",
                      USER_FUNCTION_NAME: "1UGFSV",
                      can_update: "true",

                    })
                  });
                  if (vStatus.success) {
                    var vMsg = vBoilerList["savefilter_success_message"];
                    EAM.Messaging.showConfirmation(vMsg);
                  }

                } else {
                  var vRecord = EAM.Ajax.request({
                    url: "BSUDSC.HDR",
                    params: {
                      SYSTEM_FUNCTION_NAME: "BSUDSC",
                      USER_FUNCTION_NAME: "1UGFSV",
                      CURRENT_TAB_NAME: "HDR",
                      wspf_10_user_code: vUser,
                      SCROLLROW: "YES",
                      pagemode: "view"
                    }
                  }).responseData.pageData.values;
                  vRecord["processaction"] = "sync";
                  vRecord["wspf_10_user_code"] = vUser;
                  vRecord["wspf_10_period"] = Ext.getCmp('period').value;
                  vRecord["wspf_10_view_scale"] = vScale;
                  vRecord["wspf_10_dataspy"] = Ext.getCmp('filter').value;
                  vRecord["wspf_10_start_time_period"] = Ext.getCmp('disp_starttime').value;
                  vRecord["wspf_10_end_time_period"] = Ext.getCmp('disp_endtime').value;
                  vRecord["wspf_10_minute_scale"] = Ext.getCmp('disp_minute').value;
                  if (Ext.getCmp("ShowExpired").checked) {
                    vRecord["wspf_10_expired_dates"] = "+";
                  } else {
                    vRecord["wspf_10_expired_dates"] = "-";
                  }
                  if (Ext.getCmp("HighLightCollision").checked) {
                    vRecord["wspf_10_highlight_collision"] = "+";
                  } else {
                    vRecord["wspf_10_highlight_collision"] = "-";
                  }
                  vRecord["wspf_10_expand_collapse"] = INFORGLOBALS.mod;
                  if (Ext.getCmp("ShowHours").checked) {
                    vRecord["wspf_10_show_hours"] = "+";
                  } else {
                    vRecord["wspf_10_show_hours"] = "-";
                  }
                  if (Ext.getCmp("ShowToolTip").checked) {
                    vRecord["wspf_10_show_tooltip"] = "+";
                  } else {
                    vRecord["wspf_10_show_tooltip"] = "-";
                  }
                  if (Ext.getCmp("PostPoneOp").checked) {
                    vRecord["wspf_10_postpone_op"] = "+";
                  } else {
                    vRecord["wspf_10_postpone_op"] = "-";
                  }
                  var vStatus = EAM.Ajax.request({
                    url: "BSUDSC.HDR.updaterecord?pageaction=SAVE",
                    params: Ext.merge(vRecord, {
                      CHECK_CF_CHANGEFLAG: "true",
                      CURRENT_TAB_NAME: "HDR",
                      SYSTEM_FUNCTION_NAME: "BSUDSC",
                      USER_FUNCTION_NAME: "1UGFSV",
                      can_update: "true",

                    })
                  });
                  if (vStatus.success) {
                    var vMsg = vBoilerList["savefilter_success_message"];
                    EAM.Messaging.showConfirmation(vMsg);
                  }
                }
              }

              function indexCount(graf, str) {
                var pos = 0;
                var num = -1;
                var i = -1;
                // Search the string and counts the number of e's
                while (pos != -1) {
                  pos = graf.indexOf(str, i + 1);
                  num += 1;
                  i = pos;
                }
                return num;
              }

              function updateEAM() {
                var processStatus;
                if (document.getElementById("savebtn").style.background == "lightgreen") {
                  EAM.Utils.mask(Ext.ComponentQuery.query('#custom_global_div')[0]);
                  setTimeout(
                    function () {
                    var vCounter = 0;
                    var vTotalCounter = 0;
                    var vStatus = "";

                    /*for (let i = 0; i < Link_data.length; i++) {
                      const childWO = Link_data[i].target.split('#')[0]
                        const wo_activity = Link_data[i].target.split('#')[1] == undefined ? null : Link_data[i].target.split('#')[1]
                        const parent_wo = Link_data[i].source.split('#')[0]
                        const parent_act = Link_data[i].source.split('#')[1] == undefined ? null : Link_data[i].source.split('#')[1]

                        var vRecordLink = EAM.Ajax.request({
                          url: "BSUDSC.TAB",
                          messagingOptions: {
                            deferConfirm: !0,
                            deferWarning: !0,
                            deferError: !0
                          },
                          params: {
                            SYSTEM_FUNCTION_NAME: "J1PRJ",
                            USER_FUNCTION_NAME: "J1PRJ",
                            CURRENT_TAB_NAME: "U1",
                            projectCodenum: childWO,
                            organization: gantt.getTask(childWO).organization,
                            THROW_EXCEPTION: false,
                            REFRESH_GRID: false,
                            ONLY_DATA_REQUIRED: true

                          }
                        }).responseData.pageData.values;

                      for (var k in vRecordLink) {
                        if (Ext.isObject(vRecordLink[k])) {
                          vRecordLink[k] = vRecordLink[k].selected
                        }
                      }

                      vRecordLink['wspf_10_wo_activity'] = wo_activity;
                      vRecordLink['wspf_10_seq_numb'] = -1;
                      vRecordLink['wspf_10_parent_wo'] = parent_wo;
                      vRecordLink['wspf_10_parent_act'] = parent_act;
                      vRecordLink['pagemode'] = 'display';
                      vRecordLink['processaction'] = 'insert';
                      vRecordLink['webservicepromptcode'] = 'EULWAS';
                      vRecordLink['PKID'] = childWO + "#-1";

                      var vStatus = EAM.Ajax.request({
                        url: "BSUDSC.TAB.insertrecord?pageaction=SAVE",
                        params: Ext.merge(vRecordLink, {
                          SYSTEM_FUNCTION_NAME: "J1PRJ",
                          USER_FUNCTION_NAME: "J1PRJ",
                          GRID_NAME: "J1PRJ_U1",
                          CURRENT_TAB_NAME: "U1",
                          CHECK_CF_CHANGEFLAG: true,
                          projectCodenum: childWO,
                          organization: gantt.getTask(childWO).organization,
                          can_update: true,
                          pagemode: "view"
                        }),
                        messagingOptions: {
                          deferConfirm: !0,
                          deferWarning: !0,
                          deferError: !0
                        }
                      });
                      if (!vStatus.success) {}
                    }
					*/
                    Link_data = [];

                    /*for (let i = 0; i < Link_removedata.length; i++) {
                      const childWO = Link_removedata[i].target.split('#')[0]
                        const wo_activity = Link_removedata[i].target.split('#')[1] == undefined ? null : Link_removedata[i].target.split('#')[1]
                        const parent_wo = Link_removedata[i].source.split('#')[0]
                        const parent_act = Link_removedata[i].source.split('#')[1] == undefined ? null : Link_removedata[i].source.split('#')[1]

                        var vRecordLink = EAM.Ajax.request({
                          url: "BSUDSC.TAB",
                          messagingOptions: {
                            deferConfirm: !0,
                            deferWarning: !0,
                            deferError: !0
                          },
                          params: {
                            SYSTEM_FUNCTION_NAME: "J1PRJ",
                            USER_FUNCTION_NAME: "J1PRJ",
                            CURRENT_TAB_NAME: "U1",
                            projectCodenum: childWO,
                            organization: gantt.getTask(childWO).organization,
                            webservicepromptcode: "EULWAS",
                            wspf_10_wo_code: childWO,
                            wspf_10_wo_activity: wo_activity,
                            wspf_10_parent_wo: parent_wo,
                            wspf_10_parent_act: parent_act,
                            pagemode: "view",
                            processaction: "get",
                            REFRESH_GRID: false,
                            ONLY_DATA_REQUIRED: true
                          }
                        }).responseData.pageData.values;

                      for (var k in vRecordLink) {
                        if (Ext.isObject(vRecordLink[k])) {
                          vRecordLink[k] = vRecordLink[k].selected
                        }
                      }

                      vRecordLink['pagemode'] = 'view';
                      vRecordLink['processaction'] = 'delete';
                      vRecordLink['webservicepromptcode'] = 'EULWAS';

                      var vStatus = EAM.Ajax.request({
                        url: "BSUDSC.TAB.deleterecord?pageaction=SAVE",
                        params: Ext.merge(vRecordLink, {
                          SYSTEM_FUNCTION_NAME: "J1PRJ",
                          USER_FUNCTION_NAME: "J1PRJ",
                          GRID_NAME: "J1PRJ_U1",
                          CURRENT_TAB_NAME: "U1",
                          CHECK_CF_CHANGEFLAG: true,
                          projectCodenum: childWO,
                          organization: gantt.getTask(childWO).organization,
                          can_update: true,
                          pagemode: "view"
                        }),
                        messagingOptions: {
                          deferConfirm: !0,
                          deferWarning: !0,
                          deferError: !0
                        }
                      });
                    }
					*/
                    Link_removedata = []

                    gantt.eachTask(function (task) {
                      if (task.updated == 0 && task.id && task.type == "Project") {
                        //Update Project
                        var vProjectRecord = EAM.Ajax.request({
                          url: "JSPROJ.HDR",
                          params: {
                            SYSTEM_FUNCTION_NAME: "JSPROJ",
                            USER_FUNCTION_NAME: "J1PRJ",
                            CURRENT_TAB_NAME: "HDR",
                            CHECK_CF_CHANGEFLAG: true,
                            projectcode: task.id,
                            organization: task.organization,
                            pagemode: "view"
                          }
                        }).responseData.pageData.values;

                        for (var k in vProjectRecord) {
                          if (Ext.isObject(vProjectRecord[k])) {
                            vProjectRecord[k] = vProjectRecord[k].selected
                          }
                        }

                        //vProjectRecord.schedstartdate = formatDate(task.start_date);
                        task.end_date.setDate(task.end_date.getDate());
                        //vProjectRecord.schedenddate = formatDate(task.end_date);
                        //vProjectRecord.recordid = (Math.floor(vProjectRecord.recordid)+1).toString();

                       /* vProjectRecord.udfdate07 = Ext.Date.format(task.start_date, 'm/d/Y H:i');
                        vProjectRecord.udfdate09 = Ext.Date.format(task.end_date, 'm/d/Y H:i');

                        var dStart = new Date(EAM.utils.Date.parseDate(vProjectRecord.actstartdate));
                        dStart.setDate(dStart.getDate() + EAM.utils.Date.diffDays(EAM.utils.Date.parseDate(vProjectRecord.actstartdate), EAM.utils.Date.parseDate(vProjectRecord.schedstartdate)));

                        var dEnd = new Date(EAM.utils.Date.parseDate(vProjectRecord.actenddate));
                        dEnd.setDate(dEnd.getDate() + EAM.utils.Date.diffDays(EAM.utils.Date.parseDate(vProjectRecord.actenddate), EAM.utils.Date.parseDate(vProjectRecord.schedenddate)));

                        vProjectRecord.actstartdate = formatDate(new Date(dStart.getFullYear(), dStart.getMonth(), dStart.getDate(), '00', '00'));
                        vProjectRecord.actenddate = formatDate(new Date(dEnd.getFullYear(), dEnd.getMonth(), dEnd.getDate(), '00', '00'));
                        vProjectRecord.udfchkbox04 = -1;
*/
                        var vStatus = EAM.Ajax.request({
                          url: "JSPROJ.HDR?pageaction=SAVE",
                          params: Ext.merge(vProjectRecord, {
                            SYSTEM_FUNCTION_NAME: "JSPROJ",
                            USER_FUNCTION_NAME: "J1PRJ",
                            CURRENT_TAB_NAME: "HDR",
                            CHECK_CF_CHANGEFLAG: true,
                            can_update: true,
                            pagemode: "view"
                          }),
                          messagingOptions: {
                            deferConfirm: !0,
                            deferWarning: !0,
                            deferError: !0
                          }
                        });

                        if (vStatus.success) {
                          vCounter = vCounter + 1;
                          vTotalCounter = vTotalCounter + 1;
                          task.updated = -1;
                        }

                      }; // end if WO Update
                      if (task.updated == 0 && task.type== "Activity") {
                        // SubActivity Update START

                        var projActivity = task.id.split('#')[1]; //task.parentid.substring(indexact+1,task.parentid.length);
                        var projectCode = task.dds_project;
                        var prjseq = task.sequence;

                        try {

                          var vRecd = EAM.Ajax.request({
                            url: "BSUDSC.TAB",
                            messagingOptions: {
                              deferConfirm: !0,
                              deferWarning: !0,
                              deferError: !0
                            },
                            params: {
                              "CURRENT_TAB_NAME": "U1",
                              "ONLY_DATA_REQUIRED": "true",
                              "REFRESH_GRID": "false",
                              "SYSTEM_FUNCTION_NAME": "JSPROJ",
                              "THROW_EXCEPTION": "false",
                              "USER_FUNCTION_NAME": "J1PRJ",
                              "eamid": EAM.SessionStorage.getEamId(),
                              "projectcode": projectCode,
                              "organization": task.organization,
                              "tenant": EAM.AppData.getTenantId()
                            }
                          }).responseData.pageData.values;

                          for (var k in vRecd) {
                            if (Ext.isObject(vRecd[k])) {
                              vRecd[k] = vRecd[k].selected
                            }

                          } {
                            var recordid = parseInt(vRecd["recordid"]);

                            vRecd["pagemode"] = "view";

                            vRecd["can_insert"] = "";
                            vRecd["can_delete"] = "";
                            vRecd["can_update"] = "";							
                            var vStatus = EAM.Ajax.request({
                              url: "BSUDSC.TAB.updaterecord?pageaction=SAVE",
                              params: Ext.merge(vRecd, {
                                SYSTEM_FUNCTION_NAME: "JSPROJ",
                                USER_FUNCTION_NAME: "J1PRJ",
                                CURRENT_TAB_NAME: "U1",
								can_update: true,
                                ONLY_DATA_REQUIRED: true
                              })
                            });
                          }
                          /* var vProjectRecordActUpd = EAM.Ajax.request({
                          url: "WSJOBS.ACT",
                          params: {
                          SYSTEM_FUNCTION_NAME: "WSJOBS",
                          USER_FUNCTION_NAME: gantt.custom_settings.wo_wsjobs_screen[task.dds_evt_jobtype]||"WSJOBS",
                          CURRENT_TAB_NAME: "ACT",
                          CHECK_CF_CHANGEFLAG: true,
                          projectcode:projectCode,
                          organization: task.organization,
                          activity: projActivity,
                          pagemode: "view"
                          },
                          messagingOptions: {
                          deferConfirm: !0,
                          deferWarning: !0,
                          deferError: !0
                          }
                          }).responseData.pageData.values;
                          if(vProjectRecordActUpd){
                          for (var k in vProjectRecordActUpd) {
                          if (Ext.isObject(vProjectRecordActUpd[k])) {
                          vProjectRecordActUpd[k] = vProjectRecordActUpd[k].selected
                          }
                          }


                          vProjectRecordActUpd.esthrs = task.duration/60;
                          vProjectRecordActUpd.actstartdate = Ext.Date.format(task.start_date,'m/d/Y')
                          vProjectRecordActUpd.actenddate = Ext.Date.format(task.end_date,'m/d/Y')



                          var vStatusWOUpd = EAM.Ajax.request({
                          url: "WSJOBS.ACT?pageaction=SAVE",
                          params: Ext.merge(vProjectRecordActUpd, {
                          SYSTEM_FUNCTION_NAME: "WSJOBS",
                          USER_FUNCTION_NAME: gantt.custom_settings.wo_wsjobs_screen[task.dds_evt_jobtype]||"WSJOBS",
                          CURRENT_TAB_NAME: "ACT",
                          CHECK_CF_CHANGEFLAG: true,
                          can_update: true,
                          pagemode: "view"
                          }

                          ),
                          messagingOptions: {
                          deferConfirm: !0,
                          deferWarning: !0,
                          deferError: !0
                          }
                          });

                          }

                           */

                          var vProjectRecord = EAM.Ajax.request({
                            url: "JSPROJ.HDR",
                            params: {
                              SYSTEM_FUNCTION_NAME: "JSPROJ",
                              USER_FUNCTION_NAME: "J1PRJ",
                              CURRENT_TAB_NAME: "HDR",
                              CHECK_CF_CHANGEFLAG: true,
                              projectcode: projectCode,
                              organization: task.organization,
                              pagemode: "view"
                            }
                          }).responseData.pageData.values;

                          for (var k in vProjectRecord) {
                            if (Ext.isObject(vProjectRecord[k])) {
                              vProjectRecord[k] = vProjectRecord[k].selected
                            }
                          }

                         /* if (vProjectRecord.udfchkbox04 != "-1") {
                            vProjectRecord.udfchkbox04 = -1; */

                            var vStatus = EAM.Ajax.request({
                              url: "JSPROJ.HDR?pageaction=SAVE",
                              params: Ext.merge(vProjectRecord, {
                                SYSTEM_FUNCTION_NAME: "JSPROJ",
                                USER_FUNCTION_NAME: "J1PRJ",
                                CURRENT_TAB_NAME: "HDR",
                                CHECK_CF_CHANGEFLAG: true,
                                can_update: true,
                                pagemode: "view"
                              }),
                              messagingOptions: {
                                deferConfirm: !0,
                                deferWarning: !0,
                                deferError: !0
                              }
                            });

                        //  }

                        } catch (e) {
                          //console.log("InsertPartIntoUDS: " + e)
                        }

                        if (vStatus.success) {
                          vCounter = vCounter + 1;
                          vTotalCounter = vTotalCounter + 1;
                          task.updated = -1;
                        }

                      } // SubActivity Update End

                    }); // end eachTask
                    document.getElementById("savebtn").disabled = false;
                    document.getElementById("savebtn").style.background = '';
                    var vMsg = vBoilerList["woupdate_success_message"];
                    var find = ':param1';
                    var re = new RegExp(find, 'g');
                    vMsg = vMsg.replace(re, vCounter);
                    find = ':param2';
                    re = new RegExp(find, 'g');
                    vMsg = vMsg.replace(re, vTotalCounter);
                    //parent.EAM.Messaging.showConfirmation(vCounter + " of " + vTotalCounter + " projectCode(s) updated successfully.");
                    EAM.Messaging.showConfirmation(vMsg);

                    processStatus = {
                      totalRecords: vTotalCounter,
                      successRecords: vCounter
                    };
                    EAM.Utils.unmask(Ext.ComponentQuery.query('#custom_global_div')[0]);
                    return processStatus;
                    //gantt.refreshData();
                    //myMask.hide();

                  }, 100);
                }

              }

              function changeFilter() {
                undoStack = [];
                redoStack = [];
                EAM.Utils.mask(Ext.ComponentQuery.query('#custom_global_div')[0]);
                setTimeout(
                  function () {
                  var vRefresh = document.getElementById("refreshGridbtn");
                  vRefresh.style.background = "";
                  var vSelectddds = Ext.getCmp('filter').value;
                  ArrEvents = [];
                  vDateArr = [];
                  vHoursArr = [];
                  Arrlinks = [];
                  INFORGLOBALS.refreshresourcegrid = true
                    //myMask.show(); // (Added JPG)
                    gantt.clearAll();

                  //should allow page rendering (JPG)

                  changeFilter_2(vSelectddds)
                }, 100);

                //getData(vSelectddds);
                //displayGantt(); // Affichage du GANTT - Moved Here (JPG)
                //myMask.hide(); // (Added JPG)
              };

              function changeFilter_2(vSelectddds) {
                EAM.Utils.mask(Ext.ComponentQuery.query('#custom_global_div')[0]);
                getData(vSelectddds);

                //displayGantt(); // Affichage du GANTT - Moved Here (JPG)
                //myMask.hide(); // (Added JPG)
              };

              function formatDate(vDate) {
                var vMonth = vDate.getMonth() + 1;
                var vDay = vDate.getDate();
                var vYear = vDate.getFullYear();
                return ("0" + vMonth.toString()).slice(-2) + '/' + ("0" + vDay.toString()).slice(-2) + '/' + vDate.getFullYear();
              }

              function getTradeSupplierData() {
                //var ddsid = Ext.getCmp('shiftfilter').value;

								return null;
                if (Ext.getStore("gantt.suppliertrade.store").data.items.length > 0) {
                  var vData = Ext.getStore("gantt.suppliertrade.store").data.items;

                  var SupplierMap = new Map();
                  var k = 1;
                  supplierTradeData = [];
                  for (var i = 0; i < vData.length; i++) {
                    supplierTradeData[k] = {
                      id: k,
                      trade: vData[i].data.trade,
                      supplier: vData[i].data.supplier,
                      trade_desc: vData[i].data.trade_desc,
                      supplier_desc: vData[i].data.supplier_desc,
                      type: vData[i].data.type
                    };
                    k++;

                  }

                  //Shifts = SupplierMap;
                  return supplierTradeData;
                }
              }

              function getData() {
                //myMask.show(); (JPG)
                //////console.log("ddsid before = ".concat(ddsid));
                EAM.Utils.mask(Ext.ComponentQuery.query('#custom_global_div')[0]);
                //console.log("onMask");
                if (!EAM.Utils.getScreen().isMasked()) {

                  EAM.Utils.mask(Ext.ComponentQuery.query('#custom_global_div')[0]);
                }
                var cListColumnToExcl = ["evt_code", "evt_desc"];

                vListFields = [];

                var ddsid = Ext.getCmp('filter').value;

                ddsid = ddsid.replace(" ", "").replace(",", "").replace(".", "").replace(String.fromCharCode(160), ""); // JPG - TODO: to be improved !
                var vList = EAM.Ajax.request({
                  url: "GRIDDATA",
                  params: {
                    USER_FUNCTION_NAME: "PUPRTK",
                    IGNORE_CUSTOMFIELDS: 'YES',
                    CACHE_REQUEST: false,
                    GRID_NAME: "PUPRTK",
                    FETCH_LABELS: true,
                    COMPONENT_INFO_TYPE: 'EDIT_INFO',
                    GRID_TYPE: '',
                    DATASPY_FILTER: '',
                    SKIP_DELEGATE: false
                  }
                }).responseData;
                vGridDataLength = vList.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD.length;

                var vDataspyInfo = EAM.Ajax.request({
                  url: "GRIDDATA",
                  params: {
                    USER_FUNCTION_NAME: "PUPRTK",
                    IGNORE_CUSTOMFIELDS: 'YES',
                    CACHE_REQUEST: false,
                    GRID_NAME: "PUPRTK",
                    DATASPY_ID: ddsid,
                    FETCH_LABELS: true,
                    COMPONENT_INFO_TYPE: 'EDIT_INFO',
                    GRID_TYPE: '',
                    DATASPY_FILTER: '',
                    SKIP_DELEGATE: false
                  }
                }).responseData;

                if (Ext.getStore('gantt.dataspysorting.settings')) {
                  Ext.getStore('gantt.dataspysorting.settings').destroy();
                }
                var vDataspySortSettingStore = Ext.create('Ext.data.Store', {
                  id: 'gantt.dataspysorting.settings',
                  fields: [],
                  data: []
                });
                if (EAM.Utils.propertyExists(vDataspyInfo, 'pageData.grid.GRIDRESULT.TOOLBAR.DATASPYDETAIL.SORTABLE')) {
                  if (vDataspyInfo.pageData.grid.GRIDRESULT.TOOLBAR.DATASPYDETAIL.SORTABLE.length > 0) {
                    vDataspyInfo.pageData.grid.GRIDRESULT.TOOLBAR.DATASPYDETAIL.SORTABLE.forEach(function (rec) {
                      vDataspySortSettingStore.add({
                        "id": rec.ALIAS_NAME,
                        "type": rec.TYPE
                      })
                    })
                  }
                }

                if (Ext.getStore('gantt.dataspy.settings')) {
                  Ext.getStore('gantt.dataspy.settings').destroy();
                }
                var vDataspySettingStore = Ext.create('Ext.data.Store', {
                  id: 'gantt.dataspy.settings',
                  fields: ['fieldid', 'description', 'columnorder', 'columnwidth'],
                  data: []
                });
                for (i = 0; i < vGridDataLength; i++) {
                  if (vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].order.indexOf("-") < 0 && cListColumnToExcl.indexOf(vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].name) < 0) {

                    vListFields.push("dds_" + vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].name);
                    vDataspySettingStore.add({
                      "id": "dds_" + vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].name,
                      "orig_name": vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].name,
                      "description": vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].label,
                      "columnorder": vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].order,
                      "columnwidth": vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].width,
                      "typeColumn": vDataspyInfo.pageData.grid.GRIDRESULT.GRID.FIELDS.FIELD[i].type
                    })
                  }

                }
                updateUserData();

                try {
                  var vUser = EAM.AppData.getInstallParams().get("user")
                } catch (err) {};
                if (!vUser) {
                  var vUser = 'R5'
                };

                var vRecord = EAM.Ajax.request({
                  url: "BSUDSC.TAB",
                  params: {
                    SYSTEM_FUNCTION_NAME: "BSUDSC",
                    USER_FUNCTION_NAME: "BUDUSR",
                    CURRENT_TAB_NAME: "U1",
                    wspf_10_user_code: vUser,
                    webservicepromptcode: "BUDUS2",
                    wspf_10_line: "1",
                    pagemode: "view",
                    processaction: "get",
                    REFRESH_GRID: false,
                    ONLY_DATA_REQUIRED: true
                  }
                }).responseData.pageData.values;

                vProjectList = Ext.JSON.decode(vRecord.wspf_10_c_data);
                vEmpSched = Ext.JSON.decode(vRecord.wspf_10_c_data_schedagt);
								vProjectList.data.forEach(item => {
									if (item.startdate) {
										// Convert DD/MM/YYYY → MM/DD/YYYY HH24:MI:SS
										let [day, month, year] = item.startdate.split('/');
										item.startdate = `${month}/${day}/${year} 00:00:00`;
									}

									if (item.enddate) {
										let [day, month, year] = item.enddate.split('/');
										item.enddate = `${month}/${day}/${year} 00:00:00`;
									}
								});
                if (Ext.getStore('gantt.taskschedemp.store')) {
                  Ext.getStore('gantt.taskschedemp.store').destroy();
                }
                /*var vTaskEmployeeStore = Ext.create('Ext.data.Store', {
                  id: 'gantt.taskschedemp.store',
                  fields: [],
                  data: []
                });

                vEmpSched.data.forEach(function (rec) {

                  var key = rec.taskid;
                  if (vTaskEmployeeStore.getById(key)) {
                    vTaskEmployeeStore.getById(key).data.data.push({
                      "per_code": rec.per_code,
                      "per_desc": rec.per_desc,
                      "sched_hours": rec.sched_hours,
                      "sched_date": new Date(rec.sched_date)
                    })
                  } else {
                    vTaskEmployeeStore.add({
                      id: key,
                      data: [{
                          "per_code": rec.per_code,
                          "per_desc": rec.per_desc,
                          "sched_hours": rec.sched_hours,
                          "sched_date": new Date(rec.sched_date)
                        }
                      ]
                    })
                  }

                })*/

                calGroups = vProjectList.cal_grp;

                if (calGroups.length > 0) {
                  for (k = 0; k < calGroups.length; k++) {
                    var cal = calGroups[k];
                    if (calMap.has(calGroups[k].supplier + calGroups[k].trade)) {
                      var map = calMap.get(calGroups[k].supplier + calGroups[k].trade);
                      var daydetails = {
                        start: calGroups[k].startt,
                        end: calGroups[k].endt
                      };
                      var dt1 = new Date(calGroups[k].day1);
                      map.set(formatDate(dt1), daydetails);
                      calMap.set(calGroups[k].supplier + calGroups[k].trade, map);
                    } else {
                      var map = new Map();
                      var daydetails = {
                        start: calGroups[k].startt,
                        end: calGroups[k].endt
                      };
                      var dt1 = new Date(calGroups[k].day1);
                      map.set(formatDate(dt1), daydetails);
                      calMap.set(calGroups[k].supplier + calGroups[k].trade, map);
                    }
                  }
                }
                /* DateSpeList = vProjectList.specifique_dates;
                if (DateSpeList.length > 0) {
                  for (k = 0; k < DateSpeList.length; k++) {
                    var DateSpe = DateSpeList[k];
                    if (DateSpeMap.has(DateSpeList[k].id)) {
                      var map = DateSpeMap.get(DateSpeList[k].id);
                      var mapdetails = {
                        start_date: DateSpeList[k].date,
                        desc: DateSpeList[k].desc,
                        type: DateSpeList[k].type
                      };
                      map.set(DateSpeList[k].line, mapdetails);
                      DateSpeMap.set(DateSpeList[k].id, map);
                    } else {
                      var map = new Map();
                      var mapdetails = {
                        start_date: DateSpeList[k].date,
                        desc: DateSpeList[k].desc,
                        type: DateSpeList[k].type
                      };
                      map.set(DateSpeList[k].line, mapdetails);
                      DateSpeMap.set(DateSpeList[k].id, map);
                    }
                  }
                } */
                vListOfDaysOF = [];
                vListOfDayTimeOF = [];
                vListOfDayTimeOffDetail = [];

                /* vProjectList.days_off.forEach(function (rec) {
                  vListOfDaysOF.push(rec.date)
                  if (rec.start_time != "0") {
                    var vStartTime = parseInt(rec.start_time / 3600);
                    var vEndTime = parseInt(rec.end_time / 3600);
                    var vDateFinal = rec.date + "_" + vStartTime.toString()
                      vListOfDayTimeOffDetail.push(vDateFinal);
                    while (vStartTime < vEndTime) {
                      vStartTime = vStartTime + 1;
                      vDateFinal = rec.date + "_" + vStartTime.toString();
                      vListOfDayTimeOffDetail.push(vDateFinal);
                    }
                  }
                  if (rec.start_time != "0") {
                    vListOfDayTimeOF.push(rec.date);
                  }
                })
                vSupplierList = Ext.JSON.decode(vRecord.wspf_10_c_data_supplier); */

                parseobj();

              };

              function parseobj() {
                _ScaleDateArray1 = [];
                _ScaleDateArray2 = [];
                let dPlanningStartDate = new Date(Ext.getCmp("StartDate").rawDate)

                  dMaxDate = new Date();
                var vSorterList = [];
                var vDataspySortSettingStore = Ext.getStore('gantt.dataspysorting.settings');
                var vDDsConfigStore = Ext.getStore('gantt.dataspy.settings');
                if (vDataspySortSettingStore.data.items.length > 0) {
                  vDataspySortSettingStore.data.items.forEach(function (rec) {
                    vSorterList.push({
                      property: 'dds_' + rec.data.id,
                      direction: rec.data.type
                    })
                  })

                }

                vSorterList.push({
                  property: 'dds_act_act',
                  direction: 'ASC'
                })

                if (Ext.getStore("gantt.projectCode.store")) {
                  Ext.getStore('gantt.projectCode.store').destroy();
                }
                vListFields.push('id', 'text', 'type', 'start_date', 'end_date', 'desc', 'obj_desc', 'parent', 'color', 'colormem', 'open', 'wo', 'wostatus', 'womrc', 'backgroundColor', 'prev_start', 'prev_end', 'render', 'denied',
                  'tags', 'organization', 'ctrlregind', 'actest', 'readonly', 'start_date_fmt', 'end_date_fmt', 'supervisor', 'act_trade', 'act_desc',
                  'project_code', 'due_date', 'original_due_date', 'evt_status_desc')
                var vPRJStore = Ext.create('Ext.data.Store', {
                  id: 'gantt.projectCode.store',
                  fields: [],
                  data: [],
                  sorters: vSorterList
                });

                var vDataRecord = [];
                if (Ext.getStore('gantt.taskdatesimpact')) {
                  Ext.getStore('gantt.taskdatesimpact').destroy();
                }
                var vTaskDatesImpact = Ext.create('Ext.data.Store', {
                  id: 'gantt.taskdatesimpact',
                  fields: [],
                  data: []
                });

                var lTaskDates = [];

                var vListOfFieldsForModel = [];
                vListOfFieldsForModel.push({
                  name: 'id',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'text',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'type',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'start_date',
                  type: 'date'
                });
                vListOfFieldsForModel.push({
                  name: 'act_act',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'end_date',
                  type: 'date'
                });
                vListOfFieldsForModel.push({
                  name: 'equipment',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'assignedto',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'estimatedhrs',
                  type: 'number'
                });
                vListOfFieldsForModel.push({
                  name: 'desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'obj_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'parent',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'color',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'colormem',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'open',
                  type: 'boolean'
                });
                vListOfFieldsForModel.push({
                  name: 'wo',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'wostatus',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'womrc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_evt_mrc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'backgroundColor',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'prev_start',
                  type: 'date'
                });
                vListOfFieldsForModel.push({
                  name: 'prev_end',
                  type: 'date'
                });
                vListOfFieldsForModel.push({
                  name: 'denied',
                  type: 'boolean'
                });
                vListOfFieldsForModel.push({
                  name: 'tags',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'organization',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'actest',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'readonly',
                  type: 'boolean'
                });
                vListOfFieldsForModel.push({
                  name: 'supervisor',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'act_trade',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'act_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'project_code',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'due_date',
                  type: 'date'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_isstype',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_evt_rtype',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_eqjwoclasscolor',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_jobtype_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_mrc_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_status_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_class_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_person_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_evt_object',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_evt_project',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_evt_object_org',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_priority_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'original_due_date',
                  type: 'date'
                });
                vListOfFieldsForModel.push({
                  name: 'evt_status_desc',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'recurringwo',
                  type: 'boolean'
                });
                vListOfFieldsForModel.push({
                  name: 'checked',
                  type: 'boolean'
                });
                vListOfFieldsForModel.push({
                  name: 'dds_act_percomplete',
                  type: 'string'
                });
                vListOfFieldsForModel.push({
                  name: 'risk_collision',
                  type: 'boolean'
                });
                vListOfFieldsForModel.push({
                  name: 'original_start_date',
                  type: 'date'
                });
                vListOfFieldsForModel.push({
                  name: 'original_end_date',
                  type: 'date'
                });
                vListOfFieldsForModel.push({
                  name: 'delayed_wo',
                  type: 'boolean'
                });

                Ext.getStore('gantt.dataspy.settings').each(function (rec) {
                  var vType = "string";
                  if (["VARCHAR", "MIXVARCHAR", "LONG", "CLOB"].indexOf(rec.data.typeColumn) > -1) {
                    vType = "string"
                  }
                  if (["CHKBOOLEAN"].indexOf(rec.data.typeColumn) > -1) {
                    vType = "boolean"
                  }
                  if (["DATE", "DATETIME", "TSMIDNIGHT"].indexOf(rec.data.typeColumn) > -1) {
                    vType = "date"
                  }
                  if (["CURRENCY", "NUMBER", "DECIMAL", "DURATION"].indexOf(rec.data.typeColumn) > -1) {
                    vType = "number"
                  }

                  vListOfFieldsForModel.push({
                    name: rec.data.id,
                    type: vType
                  });

                })

                Ext.define('WoStoreModel', {
                  extend: 'Ext.data.Model',
                  fields: vListOfFieldsForModel
                });
                vPRJStore.setModel('WoStoreModel');

                for (i = 0; i < vProjectList.data.length; i++) {

                  // TODO : Mieux gÃ©rer la convertion de dates selon la config utilisateur (local)
                  if (vProjectList.data[i].startdate != "") {
                    let bDelayedWO = false;
                    if (!vProjectList.data[i].enddate) {
                      vProjectList.data[i].enddate = vProjectList.data[i].startdate
                    };

                    let vDateRetenue = new Date();

                    let dStartDate = new Date(vProjectList.data[i].startdate);
                    let dEndDate = new Date(vProjectList.data[i].enddate);
                    let dOriginalStartDate = new Date(vProjectList.data[i].startdate);
                    let dOriginalEndDate = new Date(vProjectList.data[i].enddate);
                    if (parseFloat(Ext.Date.format(dPlanningStartDate, 'Ymd')) > parseFloat(Ext.Date.format(dStartDate, 'Ymd'))) {
                      dStartDate = new Date(dPlanningStartDate);
                      dStartDate.setHours(dOriginalStartDate.getHours());
                      dStartDate.setMinutes(dOriginalStartDate.getMinutes());
                      let dDiff = Ext.Date.diff(new Date(Ext.Date.format(new Date(dOriginalStartDate), "m/d/Y")), new Date(Ext.Date.format(new Date(dOriginalEndDate), "m/d/Y")), Ext.Date.DAY);
                      dEndDate = new Date(Ext.Date.format(new Date(dStartDate), 'm/d/Y'));
                      dEndDate.setDate(dEndDate.getDate() + dDiff);
                      dEndDate.setHours(dOriginalEndDate.getHours());
                      dEndDate.setMinutes(dOriginalEndDate.getMinutes());
                      bDelayedWO = true;
                    }

                    let vDueDate = new Date(dStartDate)
                      if (vProjectList.data[i].evt_due != "" && vProjectList.data[i].evt_due != undefined) {
                        vDueDate = new Date(vProjectList.data[i].evt_due)
                      }
                      if (dEndDate.getHours() == 0) {
                        dEndDate.setHours(23);
                        dEndDate.setMinutes(59);
                      };
                    if (dMaxDate < dEndDate) {
                      dMaxDate = dEndDate;
                    }

                    var vActEst = parseFloat(vProjectList.data[i].esthours);
                    var vProjectCode = "";
                    var vActivityCode = "";
                    var vSubActivityCode = "";

                    if (vProjectList.data[i].proj_code.indexOf("#") > -1) {
                      vProjectCode = vProjectList.data[i].proj_code.split("#")[0]
                        vActivityCode = vProjectList.data[i].proj_code.split("#")[2]
                        vSubActivityCode = "0";//vProjectList.data[i].proj_code.split("#")[2]""
                    } else {
                      vProjectCode = vProjectList.data[i].proj_code
                    }

                    if (vProjectCode != "") {

                      vActEst = parseFloat(vActEst.toFixed(1));

                      if (vPRJStore.getById(vProjectCode)) {
                        //not to do because not anymore needed

                      } else {

                        // Create WO record
                        var vReadOnly = false;
                        var vColorClasse = vProjectList.data[i].eqjwoclasscolor;
                        var vUnScheduled = 0;

                        if (vProjectList.data[i].proj_code.indexOf("(") > 0) {
                          vReadOnly = true;
                        } else {
                          if (vProjectList.data[i].prjstatus == "C") {
                            vReadOnly = true;
                          }
						  if (vProjectList.data[i].prjupdate == "0") {
                            vReadOnly = true;
                          }
						  else {
                            vReadOnly = false;
                          }
                        }

                        var vPerson = vProjectList.data[i].evt_person;
                        if (!vPerson) {
                          vPerson = ''
                        };
                        var vActEst = 0 //parseFloat(vProjectList.data[i].esthours);
                          vActEst = parseFloat(vActEst.toFixed(1));
                        var ProjectCode;
                        if (vProjectCode.indexOf("(") > 0) {
                          ProjectCode = vProjectCode.substr(0, vProjectList.data[i].proj_code.indexOf("("));
                        } else {
                          ProjectCode = vProjectCode;
                        }

                        var vDesc;
                        var vNewColor = gantt.custom_settings.wo_type_color[vProjectList.data[i].eqjwoclasscolor];
                        if (vProjectList.data[i].status_color != "" && vProjectList.data[i].status_color != null) {
                          var className = 'inline-icon.inverse.' + vProjectList.data[i].status_color.toLowerCase();
                          for (let i = 0; i < document.styleSheets.length; i++) {
                            const styleSheet = document.styleSheets[i];

                            try {
                              // VÃ©rifier si la feuille de style est accessible
                              const rules = styleSheet.cssRules || styleSheet.rules; // Pour Firefox et autres

                              // Parcourir les rÃ¨gles de la feuille de style
                              for (let j = 0; j < rules.length; j++) {
                                const rule = rules[j];

                                // VÃ©rifier si la rÃ¨gle correspond exactement Ã  la classe souhaitÃ©e
                                if (rule.selectorText) {
                                  // On utilise une expression rÃ©guliÃ¨re pour correspondre exactement
                                  const regex = new RegExp(`^\\.${className}\\b`);

                                  if (regex.test(rule.selectorText)) {
                                    vNewColor = rule.style.backgroundColor;
                                    //console.log(`RÃ¨gle trouvÃ©e pour ${className}: ${rule.cssText}`);
                                  } //
                                }
                              }
                            } catch (e) {
                              console.warn(`La feuille de style ${styleSheet.href} ne peut pas Ãªtre accÃ©dÃ©e : ${e}`);
                            }
                          }
                        }

                        /* if (vProjectList.data[i].eqjwoclasscolor.indexOf('pm_') >= 0 && vProjectList.data[i].proj_code.indexOf("(") < 0) {
                          if (dStartDate > vDueDate) {
                            vNewColor = "#be2c0d";
                            vDesc = "<table style='width:100%;'><tr><td>" + vProjectList.data[i].prj_desc + "</td></tr><tr><td>" + vProjectList.data[i].obj_desc + "</td></tr><tr></tr></table>";
                          } else {
                            vDesc = "<table style='width:100%;'><tr><td>" + vProjectList.data[i].prj_desc + "</td></tr><tr><td>" + vProjectList.data[i].obj_desc + "</td></tr><tr></tr></table>";
                          }
                        } else {
                          vDesc = "<table style='width:100%;'><tr><td>" + vProjectList.data[i].prj_desc + "</td></tr><tr><td>" + vProjectList.data[i].obj_desc + "</td></tr></table>";
                        } */

                        //Amazon Scheduling tool code ends here


                        Ext.getStore('gantt.dataspy.settings').each(function (rec) {
                          var vElement = rec.data.id;
                          var vValue = vProjectList.data[i][rec.data.orig_name]
                            if (Ext.ClassManager.get('WoStoreModel').getField(vElement).type == "date") {
                              if (vValue || "" != "") {
                                vDataRecord[vElement] = EAM.Utils.dateObjectFromString(vValue);
                              } else {
                                vDataRecord[vElement] = vValue || "";
                              }
                            } else {
                              vDataRecord[vElement] = vValue || "";
                            }
                        });

                        vPRJStore.add(new Ext.data.Record({
                            id: vProjectCode,
                            text: vProjectList.data[i].prjdesc,
                            type: "Project",
                            start_date: dStartDate,
                            act_act: "0000",
                            end_date: dEndDate,
                            //equipment: vProjectList.data[i].evt_object,
                            assignedto: vPerson,
                            estimatedhrs: 0, //parseFloat(vProjectList.data[i].esthours).toFixed(2),
                            desc: vProjectList.data[i].prj_desc,
                            //obj_desc: vProjectList.data[i].obj_desc,
                            parent: "",
                            color: vNewColor,
                            colormem: vNewColor,
                            open: INFORGLOBALS.mod == "expand" ? true : false,
                            wo: vProjectList.data[i].proj_code,
                            wostatus: vProjectList.data[i].prjstatus,
                            //womrc: vProjectList.data[i].evt_mrc,
                            //dds_evt_mrc: vProjectList.data[i].evt_mrc,
                            backgroundColor: 'transparent',
                            //prev_start: dStartDate,
                            //prev_end: dEndDate,
                            denied: false,
                            tags: vProjectList.data[i].proj_code + ' ' + vProjectList.data[i].prj_desc+ ' ' + vProjectList.data[i].enddate + ' ' + vProjectList.data[i].startdate,
                            organization: vProjectList.data[i].organization,
                            //actest: vActEst.toString(),
                            readonly: vReadOnly,
                            //supervisor: "",
                            //act_trade: "",
                           // act_desc: "",
                            project_code: vProjectCode,
							sequence :vProjectList.data[i].plp_seq,
                            /*due_date: "",
                            dds_isstype: '',
                            dds_evt_rtype: '',
                            dds_eqjwoclasscolor: '',
                            dds_jobtype_desc: vProjectList.data[i].jobtype_desc,
                            dds_mrc_desc: vProjectList.data[i].mrc_desc,
                            dds_status_desc: vProjectList.data[i].status_desc,
                            dds_class_desc: vProjectList.data[i].class_desc,
                            dds_person_desc: vProjectList.data[i].person_desc,
                            dds_evt_object: vProjectList.data[i].evt_object,
                            dds_evt_project: vProjectList.data[i].evt_project,
                            dds_evt_object_org: vProjectList.data[i].evt_object_org,
                            dds_mrc_desc: vProjectList.data[i].mrc_desc,
                            dds_priority_desc: vProjectList.data[i].priority_desc,
                            original_due_date: '',
                            evt_status_desc: '',
                            recurringwo: vProjectList.data[i].recurrentwo,
                            dds_act_percomplete: "",
                            dds_class_desc: vProjectList.data[i].class_desc,
                            risk_collision: vProjectList.data[i].evt_udfchkbox04,*/
                            checked: false,
                            act_act: null,
                            original_start_date: dOriginalStartDate,
                            original_end_date: dOriginalEndDate,
                            delayed_wo: bDelayedWO

                          }));

                        vPRJStore.getById(vProjectCode).mergeData(vDataRecord)
                      }
                      if (vActivityCode != "" && vSubActivityCode == "0") {

                        var vReadOnly = false;
                        var vParent = vProjectCode;
                        var vColorClasse = vProjectList.data[i].eqjwoclasscolor;
                        var vUnScheduled = 0;

                        if (vProjectList.data[i].prjstatus == "C") {
                          vReadOnly = true;
                        }
						if (vProjectList.data[i].actupdate == "0") {
                            vReadOnly = true;
                        }
						if (vProjectList.data[i].advance == "100") {
							vReadOnly = true;
						}
						else {
                          vReadOnly = false;
                        }
                        var vPerson = vProjectList.data[i].evt_person;
                        if (!vPerson) {
                          vPerson = ''
                        };
                        var vActEst = 0 //parseFloat(vProjectList.data[i].esthours);
                          vActEst = parseFloat(vActEst.toFixed(1));
                        var ProjectCode;

                        ProjectCode = vProjectCode;

                        var vDesc;

                        vNewColor = "#6D706E"; //gantt.custom_settings.wo_type_color[vProjectList.data[i].act_assignmentstatus];
                        vDesc = vProjectList.data[i].act_note || vProjectList.data[i].prj_desc
                          Ext.getStore('gantt.dataspy.settings').each(function (rec) {
                            var vElement = rec.data.id;
                            var vValue = vProjectList.data[i][rec.data.orig_name]
                              if (Ext.ClassManager.get('WoStoreModel').getField(vElement).type == "date") {
                                if (vValue || "" != "") {
                                  vDataRecord[vElement] = EAM.Utils.dateObjectFromString(vValue);
                                } else {
                                  vDataRecord[vElement] = vValue || "";
                                }
                              } else {
                                vDataRecord[vElement] = vValue || "";
                              }
                          });
                        if (vProjectList.data[i].startdate != "") {
                          vStartdateformat = new Date(vProjectList.data[i].startdate);

                        }

                        if (vProjectList.data[i].enddate != "") {
                          vEnddateformat = new Date(vProjectList.data[i].enddate);

                        }
                        let dOriginalActStartDate = new Date(vProjectList.data[i].startdate);
                        let dOriginalActEndDate = new Date(vProjectList.data[i].enddate);
                        if (parseFloat(Ext.Date.format(dPlanningStartDate, 'Ymd')) > parseFloat(Ext.Date.format(vStartdateformat, 'Ymd'))) {
                          let dDiff_Act = Ext.Date.diff(new Date(Ext.Date.format(new Date(dOriginalStartDate), "m/d/Y")), new Date(Ext.Date.format(new Date(vStartdateformat), "m/d/Y")), Ext.Date.DAY);
                          vStartdateformat = new Date(dPlanningStartDate);
                          vStartdateformat.setDate(vStartdateformat.getDate() + dDiff_Act);
                          if (parseFloat(Ext.Date.format(dPlanningStartDate, 'Ymd')) > parseFloat(Ext.Date.format(vStartdateformat, 'Ymd'))) {
                            vStartdateformat = new Date(dPlanningStartDate);
                          }
                          vStartdateformat.setHours(dOriginalActStartDate.getHours());
                          vStartdateformat.setMinutes(dOriginalActStartDate.getMinutes());
                          let dDiff_Act2 = Ext.Date.diff(new Date(Ext.Date.format(new Date(dOriginalActStartDate), "m/d/Y")), new Date(Ext.Date.format(new Date(dOriginalActEndDate), "m/d/Y")), Ext.Date.DAY);
                          vEnddateformat = new Date(Ext.Date.format(new Date(vStartdateformat), 'm/d/Y'));
                          vEnddateformat.setDate(vEnddateformat.getDate() + dDiff_Act2);
                          vEnddateformat.setHours(dOriginalActEndDate.getHours());
                          vEnddateformat.setMinutes(dOriginalActEndDate.getMinutes());
                          bDelayedWO = true;
                        }

                        if (vEnddateformat.getHours() == 0) {
                          vEnddateformat.setHours(23);
                          vEnddateformat.setMinutes(59);
                        }

                        /*Initiaite the task impact*/

                        var dDateTemp = new Date(Ext.Date.format(vStartdateformat, 'm/d/Y')),
                        dDateTemp2 = new Date(Ext.Date.format(vEnddateformat, 'm/d/Y')),
                        nNbOcurr = 0,
                        nHrsPerDay = parseFloat(vProjectList.data[i].act_est)

                          lTaskDates = [];

                        while (dDateTemp <= dDateTemp2) {
                          nNbOcurr++;
                          lTaskDates.push(Ext.Date.format(dDateTemp, 'm/d/Y'));
                          dDateTemp.setDate(dDateTemp.getDate() + 1)
                        }

                        var vRelatedResource = ""
                          if (vProjectList.data[i].act_supplier === "") {
                            vRelatedResource = vProjectList.data[i].evt_mrc
                          } else {
                            vRelatedResource = vProjectList.data[i].act_supplier
                          }
                          nHrsPerDay = parseFloat((nHrsPerDay / (nNbOcurr == 0 ? 1 : nNbOcurr)).toFixed(1))
                          vTaskDatesImpact.add({
                            id: vProjectCode + '#' + vActivityCode ,
                            dates: lTaskDates,
                            relatedresource: vRelatedResource,
                            hours: nHrsPerDay
                          })

                          vPRJStore.add(new Ext.data.Record({
                              id: vProjectCode + '#' + vActivityCode ,
                              text: vProjectList.data[i].activitydesc,
                              act_act: ("000" + (vActivityCode).toString()).toString().slice(-4) + "-0",
                              start_date: vStartdateformat,
                              end_date: vEnddateformat,
                              equipment: vProjectList.data[i].evt_object,
                              type: "Activity",
                              desc: vDesc,
                              obj_desc: vProjectList.data[i].obj_desc,
                              parent: vProjectList.data[i].parent,//vParent, //Gestion du regroupement
                              color: vNewColor,
                              colormem: vNewColor,
                              open: true,
                              //render :"split",
                              wo: vProjectList.data[i].proj_code,
                              wostatus: vProjectList.data[i].prjstatus,
                              womrc: vProjectList.data[i].evt_mrc,
                              dds_evt_mrc: vProjectList.data[i].evt_mrc,
                              prev_start: vStartdateformat,
                              prev_end: vEnddateformat,
							  sequence :vProjectList.data[i].plp_seq,
                              denied: false,
                              //Tags = Info bulle liÃ©e Ã  la cellule
                              tags: vProjectList.data[i].evt_object + ' ' + vProjectList.data[i].evt_target + ' ' + vProjectList.data[i].prj_desc + ' (' + vPerson + ') ' + vProjectList.data[i].obj_desc + ' ' + vProjectList.data[i].proj_code,
                              organization: vProjectList.data[i].organization,
                              actest: vActEst.toString(),
                              readonly: vReadOnly,
                              start_date_fmt: "",
                              end_date_fmt: "",
                              supervisor: vProjectList.data[i].evt_udfchar10 || "",
                              act_trade: vProjectList.data[i].act_trade || "",
                              act_desc: vProjectList.data[i].act_note || "",
                              operation_impact: vProjectList.data[i].evt_udfchar29 || "",
                              project_code: ProjectCode,
                              due_date: vDueDate,
                              original_due_date: vProjectList.data[i].origin_evt_due,
                               dds_act_statut_desc: vProjectList.data[i].act_statut_desc,
                              dds_act_supplier: vProjectList.data[i].act_supplier,
                              dds_act_supplier_desc: vProjectList.data[i].act_supplier_desc,
                              dds_act_trade: vProjectList.data[i].act_trade,
                              dds_act_trade_desc: vProjectList.data[i].act_trade_desc,
                              dds_act_persons: vProjectList.data[i].act_persons,
                              dds_act_est: vProjectList.data[i].act_est,
                              dds_act_udfnote01: vProjectList.data[i].act_udfnote01,
                              dds_act_udfnum01: vProjectList.data[i].act_udfnum01,
                              dds_act_udfchar20: vProjectList.data[i].act_udfchar20,
                              dds_priority_desc: vProjectList.data[i].priority_desc,
                              dds_act_percomplete: vProjectList.data[i].advance,
                              dds_class_desc: vProjectList.data[i].class_desc,
                              risk_collision: vProjectList.data[i].evt_udfchkbox04, 
                              original_start_date: dOriginalActStartDate,
                              original_end_date: dOriginalActEndDate,
                              delayed_wo: bDelayedWO
                            }));
                        vPRJStore.getById(vProjectCode + '#' + vActivityCode ).mergeData(vDataRecord)
                      }
                    }; // end if
                  }; // end if
                }; // end loop
                var vPRJStore2 = Ext.getStore("gantt.projectCode.store");
                vPRJStore2.data.items.forEach(function (rec) {
                  if (rec.data.id.endsWith("#1")) {
                    vPRJStore2.getById(rec.data.id.split('#')[0] + '#' + rec.data.id.split('#')[1] + '#0').data.start_date = rec.data.start_date
                      vPRJStore2.getById(rec.data.id.split('#')[0] + '#' + rec.data.id.split('#')[1] + '#0').data.end_date = rec.data.end_date
                  }
                });
                /* if (Ext.getStore("gantt.suppliertrade.store")) {
                  Ext.getStore("gantt.suppliertrade.store").removeAll();
                  var vSupplierTradeStore = Ext.getStore("gantt.suppliertrade.store");
                } else {
                  var vListFieldsSupp = [];
                  vListFieldsSupp.push('id', 'supplier', 'supplierorg', 'trade', 'trade_desc', 'supplier_desc')
                  var vSupplierTradeStore = Ext.create('Ext.data.Store', {
                    id: 'gantt.suppliertrade.store',
                    fields: vListFieldsSupp,
                    data: []
                  });
                }
                if (Ext.getStore("gantt.suppliertradedate.store")) {
                  Ext.getStore("gantt.suppliertradedate.store").removeAll();
                  var vSupplierTradeDateStore = Ext.getStore("gantt.suppliertradedate.store");
                } else {
                  var vListFieldsSuppTradeDate = [];
                  vListFieldsSuppTradeDate.push('id', 'supplier', 'supplierorg', 'trade', 'date', 'availqty', 'planqty', 'type')
                  var vSupplierTradeDateStore = Ext.create('Ext.data.Store', {
                    id: 'gantt.suppliertradedate.store',
                    fields: vListFieldsSuppTradeDate,
                    data: []
                  });
                }
                for (i = 0; i < vSupplierList.data.length; i++) {
                  var vId = vSupplierList.data[i].supplier_code + "#" + vSupplierList.data[i].supplier_org + "#" + vSupplierList.data[i].trade;
                  vSupplierTradeDateStore.add(new Ext.data.Record({
                      supplier: vSupplierList.data[i].supplier_code,
                      supplier_org: vSupplierList.data[i].supplier_org,
                      trade: vSupplierList.data[i].trade,
                      date: vSupplierList.data[i].date,
                      availqty: vSupplierList.data[i].avail_qty,
                      planqty: vSupplierList.data[i].sum_act,
                      type: vSupplierList.data[i].type
                    }));

                  if (!vSupplierTradeStore.getById(vId)) {
                    vSupplierTradeStore.add(new Ext.data.Record({
                        id: vId,
                        supplier: vSupplierList.data[i].supplier_code,
                        supplier_org: vSupplierList.data[i].supplier_org,
                        trade: vSupplierList.data[i].trade,
                        supplier_desc: vSupplierList.data[i].supplier_desc,
                        trade_desc: vSupplierList.data[i].trade_desc,
                        type: vSupplierList.data[i].type
                      }))
                  }
                } */

                displayGantt();
                displayResourceGantt();
              }; // end parseobj


              function displayResourceGantt() {
                /*gantt.plugins({
                grouping: true,
                auto_scheduling: true
                });*/
                gantt.config.resource_render_empty_cells = true;
                var resourceMode = 'hours';
                gantt.config.date_format = "%d-%m-%Y %H:%i:%s";
                //gantt.config.date_format = "%Y-%m-%d %H:%i:%s";

                resData = getTradeSupplierData();

                //ShiftsHours = getShiftHours();
                //employeesLeave = getEmployeeLeaveDetails();
                //emmloyeesAvl = getEmployeeAvailability();
                gantt.templates.resource_cell_value = function (start_date, end_date, resource, tasks) {

                  if (gantt.config.scale_unit == "day") {
                    return ""
                  } else {
                    var vData = vSupplierList.data;
                    var vDate = Ext.Date.format(start_date, 'm/d/Y');

                    var vCurrentData = vData.filter(function (rec) {
                      return rec.supplier_code == resource.supplier && rec.trade == resource.trade && rec.date == vDate;
                    });
                    if (vCurrentData.length > 0) {
                      var emphrs = vCurrentData[0].sum_act;
                      var hours = vCurrentData[0].avail_qty;
                      var vId = vCurrentData[0].supplier_code + "_" + vCurrentData[0].trade + "_" + Ext.Date.format(start_date, 'Ymd');
                      var html = "<div id ='" + vId + "' class='resource_avl_day' type='" + vCurrentData[0].type + "'  supplier='" + vCurrentData[0].supplier_code + "' supplierorg='" + vCurrentData[0].supplier_org + "' supplierdesc='" + vCurrentData[0].supplier_desc + "' trade='" + vCurrentData[0].trade + "' tradedesc='" + vCurrentData[0].trade_desc + "' date='" + Ext.Date.format(start_date, 'm/d/Y') + "' availhrs='" + parseFloat(new Number(hours + '').toFixed(parseInt(12))) + "' acthrs='" + parseFloat(new Number(emphrs + '').toFixed(parseInt(12))) + "'>";
                      //html += parseFloat(new Number(hours+'').toFixed(parseInt(12))) + ' | ' + parseFloat(new Number(emphrs+'').toFixed(parseInt(12)));
                      html += parseFloat(new Number(emphrs + '').toFixed(parseInt(12))) + ' | ' + parseFloat(new Number(hours + '').toFixed(parseInt(12)))
                      html += "</div>";
                      ////console.log(html);
                    } else {
                      var html = "";
                    }
                    return html;
                  }

                  //}


                };
                gantt.templates.resource_cell_class = function (start_date, end_date, resource, tasks) {

                  if (gantt.config.scale_unit == "day") {
                    return ""
                  } else {
                    var vData = vSupplierList.data;
                    var vDate = Ext.Date.format(start_date, 'm/d/Y');
                    var vCurrentData = vData.filter(function (rec) {
                      return rec.supplier_code == resource.supplier && rec.trade == resource.trade && rec.date == vDate;
                    });
                    if (vCurrentData.length > 0) {
                      var ActHrs = parseFloat(vCurrentData[0].sum_act);
                      var AvailHrs = parseFloat(vCurrentData[0].avail_qty);
                      var vRatio = ActHrs / AvailHrs
                        if (vRatio >= 1) {
                          return "resource_marker workday_over";
                        } else {
                          if (vRatio >= 0.8) {
                            return "resource_marker workday_medium";
                          } else {
                            return "resource_marker workday_ok";
                          }

                        }

                    } else {
                      return "resource_marker workday_ok";
                    }
                    return "resource_marker workday_ok";
                  }

                };

                gantt.config.scales = [{
                    unit: "month",
                    step: 1,
                    format: "%F, %Y"
                  }, {
                    unit: "day",
                    step: 1,
                    format: "%d %M"
                  }, {
                    unit: "hour",
                    step: 1,
                    format: "%G"
                  }
                ];
                gantt.config.auto_scheduling = true;
                gantt.config.auto_scheduling_strict = true;
                //gantt.config.work_time = true;
                gantt.config.resource_store = "resource";
                gantt.config.resource_property = "owner_id";
                gantt.config.order_branch = true;
                gantt.config.open_tree_initially = true;
                gantt.config.scale_height = 60;

                function setConfigLayout(_width) {
                  var resourceTemplates = {
                    grid_row_class: function (start, end, resource) {
                      var css = [];
                      if (gantt.$resourcesStore.hasChild(resource.id)) {
                        css.push("folder_row");
                        css.push("group_row");
                      }
                      return css.join(" ");
                    },
                    task_row_class: function (start, end, resource) {
                      var css = [];
                      if (gantt.$resourcesStore.hasChild(resource.id)) {
                        css.push("group_row");
                      }
                      return css.join(" ");
                    }
                  };
                  var resourceConfig = {
                    scale_height: 60,
                    scales: [{
                        unit: "day",
                        step: 1,
                        date: "%d %M"
                      }
                    ],
                    columns: [{
                        name: "supplier",
                        label: vBoilerList["res_header_supplier"],
                        tree: false,
                        width: 300,
                        template: function (resource) {
                          return resource.supplier_desc;
                        },
                        resize: true
                      }
                      /*, {
                      name: "trade",
                      label: vBoilerList["res_header_trade"],
                      tree: false,
                      hidden: true,
                      width: 200,
                      template: function(resource) {
                      return resource.trade_desc;
                      },
                      resize: true
                      }*/
                    , {
                        name: "type",
                        label: vBoilerList["res_header_type"],
                        tree: false,
                        width: 250,
                        template: function (resource) {
                          if (resource.type === "MRC") {
                            return vBoilerList["res_header_mrc"]
                          } else {
                            return vBoilerList["res_header_supp"]
                          }

                        },
                        resize: true
                      }
                    ]
                  };
                  gantt.config.resize_rows = false;
                  gantt.config.layout = {
                    css: "gantt_container",
                    rows: [{
                        gravity: 2,

                        cols: [{
                            width: _width,
                            rows: [{

                                view: "grid",
                                scrollX: "gridScroll",
                                scrollable: true,
                                scrollY: "scrollVer",
                              }, {
                                view: "scrollbar",
                                id: "gridScroll",
                                group: "horizontal"
                              }
                            ]
                          }, {
                            resizer: true,
                            width: 1,
                            group: "vertical"
                          }, {
                            rows: [{
                                view: "timeline",
                                scrollX: "scrollHor",
                                scrollY: "scrollVer",
                                collapsible: true
                              }, {
                                view: "scrollbar",
                                id: "scrollHor",
                                group: "horizontal"
                              }
                            ]
                          }, {
                            view: "scrollbar",
                            id: "scrollVer",
                            group: "vertical"
                          }

                        ]

                      }, {
                        resizer: true,
                        width: 1
                      }/*, {
                        gravity: 1,
                        cols: [{
                            width: _width,
                            rows: [{
                                config: resourceConfig,
                                templates: resourceTemplates,
                                rows: [{
                                    view: "resourceGrid",
                                    scrollY: "resourceVScroll"
                                  }
                                ]
                              }
                            ]
                          },
                          //{resizer:true,width:1, group: "vertical"},
                          {
                            rows: [{
                                view: "resourceTimeline",
                                scrollX: "scrollHor",
                                scrollY: "resourceVScroll",
                                collapsible: true
                              }
                            ]
                          }, {
                            view: "scrollbar",
                            id: "resourceVScroll",
                            group: "vertical"
                          }

                        ]

                      }*/
                    ]
                  };
                  /*  gantt.config.layout = {
                  css: "gantt_container",
                  rows: [{
                  gravity: 2,

                  cols: [{
                  width: _width,
                  rows: [{

                  view: "grid",
                  scrollX: "gridScroll",
                  scrollable: true,
                  scrollY: "scrollVer",
                  },{
                  view: "scrollbar",
                  id: "gridScroll",
                  group: "horizontal"
                  }
                  ]
                  },{
                  resizer: true,
                  width: 1,
                  group: "vertical"
                  },{
                  rows: [{
                  view: "timeline",
                  scrollX: "scrollHor",
                  scrollY: "scrollVer",
                  collapsible: true
                  },{
                  view: "scrollbar",
                  id: "scrollHor",
                  group: "horizontal"
                  }
                  ]
                  }, {
                  view: "scrollbar",
                  id: "scrollVer",
                  group: "vertical"
                  }

                  ]

                  },{
                  resizer: true,
                  width: 1
                  },{
                  gravity: 1,
                  cols: [{
                  width: _width,
                  rows: [{
                  config: resourceConfig,
                  templates: resourceTemplates,
                  rows: [{
                  view: "resourceGrid",
                  scrollY: "resourceVScroll"
                  }]
                  }]
                  },
                  //{resizer:true,width:1, group: "vertical"},{
                  rows: [{
                  view: "resourceTimeline",
                  scrollX: "scrollHor",
                  scrollY: "resourceVScroll",
                  collapsible: true
                  }]
                  },{
                  view: "scrollbar",
                  id: "resourceVScroll",
                  group: "vertical"
                  }

                  ]

                  }
                  ]
                  };*/
                }

                gantt.attachEvent("onGanttRender", function () {
                  refreshColumnfilter();
                  // Votre logique ici

                });

                gantt.attachEvent("onBeforeGanttReady", function () {
                  setConfigLayout(vGridSize);
                });
                gantt.attachEvent("onGridRender", function () {
                  var rows = document.querySelectorAll(".gantt_row");
                  rows.forEach(function (row) {
                    row.style.height = "auto";
                  });
                  gantt.render();
                });

                gantt.attachEvent("onGridResizeEnd", function (old_width, new_width) {
                  //console.log(new_width);
                  setConfigLayout(new_width);
                  gantt.resetLayout();
                  return true;
                });

                var resourceMode = "hours";
                gantt.attachEvent("onTaskSelected", function (id) {
                  var task = gantt.getTask(id)
                    var store = gantt.getDatastore("resource");
                  var vId = -1;

                  if (task.dds_act_supplier === "") {
                    for (i = 1; i <= store.fullOrder.length; i++) {
                      if (store.pull[i].supplier == task.dds_act_mrc && store.pull[i].trade == '*') {
                        vId = store.pull[i].id;
                      }
                    }
                  } else {
                    for (i = 1; i <= store.fullOrder.length; i++) {
                      if (store.pull[i].supplier == task.dds_act_supplier && store.pull[i].trade == '*') {
                        vId = store.pull[i].id;
                      }
                    }
                  }

                  if (vId > 0) {
                    store.select(vId)
                    var index = store.getIndexById(vId)
                      gantt.$ui.getView("resourceVScroll").scroll(index * gantt.config.row_height)
                  }
                });

                gantt.attachEvent("onAfterSort", function () {
                  // RÃ©cupÃ©rer l'input et rÃ©attacher l'Ã©vÃ©nement
                  setTimeout(function () {
                    document.querySelectorAll('input[data-column]').forEach(function (input) {

                      input.addEventListener("input", function () {

                        var column = this.getAttribute('data-column');
                        if (this.value == null || this.value === "") {
                          delete tGridFilters[column]
                        } else {
                          tGridFilters[column] = this.value
                        }; // Met Ã  jour la variable de filtres dynamiques
                        gantt.refreshData(); // Met Ã  jour l'affichage des tÃ¢ches
                      });
                    });

                  }, 3000)
                });

                gantt.attachEvent("onGanttReady", function () {

                  document.querySelector(".gantt_task_scale").addEventListener('click', function (e) {
                    e.preventDefault();
                    var currentScale = gantt.config.cust_scale;

                    // On augmente ou diminue le zoom en fonction de la direction de la molette

                    switch (currentScale) {
                    case "4":
                      Ext.getCmp("viewmode_gantt").setValue("5") //setScaleConfig('5');
                      break;
                    case "5":
                      Ext.getCmp("viewmode_gantt").setValue("3") //setScaleConfig('3');
                      break;
                    case "3":
                      Ext.getCmp("viewmode_gantt").setValue("2") //setScaleConfig('2');
                      break;
                    case "2":
                      Ext.getCmp("viewmode_gantt").setValue("1") //setScaleConfig('1');
                      break;
                    }

                    gantt.render();

                  });

                  document.querySelector(".gantt_task_scale").addEventListener('contextmenu', function (e) {
                    e.preventDefault();
                    var currentScale = gantt.config.cust_scale;
                    switch (currentScale) {
                    case "5":
                      Ext.getCmp("viewmode_gantt").setValue("4") //setScaleConfig('4');
                      break;
                    case "3":
                      Ext.getCmp("viewmode_gantt").setValue("5") //setScaleConfig('5');
                      break;
                    case "2":
                      Ext.getCmp("viewmode_gantt").setValue("3") //setScaleConfig('3');
                      break;
                    case "1":
                      Ext.getCmp("viewmode_gantt").setValue("2") //setScaleConfig('2');
                      break;
                    }

                    gantt.render();

                  });

                  var tooltips = gantt.ext.tooltips;
                  tooltips.tooltipFor({
                    selector: ".baseline_date_debut",
                    html: function (event, node) {
                      var taskDate = node.getAttribute("date-baseline");
                      var taskText = node.getAttribute("text-baseline");
                      var taskType = node.getAttribute("type-baseline");
                      return "<b>Type:</b> " + taskType + "</br><b>Date:</b> " + taskDate + "</br>" + taskText;
                    }
                  });
                  tooltips.tooltipFor({
                    selector: ".baseline_date_fin",
                    html: function (event, node) {
                      var taskDate = node.getAttribute("date-baseline");
                      var taskText = node.getAttribute("text-baseline");
                      var taskType = node.getAttribute("type-baseline");
                      return "<b>Type:</b> " + taskType + "</br><b>Desc.:</b> " + taskText + "</br><b>Date:</b> " + taskDate;
                    }
                  });
                  tooltips.tooltipFor({
                    selector: ".baseline_date_finj",
                    html: function (event, node) {
                      var taskDate = node.getAttribute("date-baseline");
                      var taskText = node.getAttribute("text-baseline");
                      var taskType = node.getAttribute("type-baseline");
                      return "<b>Type:</b> " + taskType + "</br><b>Desc.:</b> " + taskText + "</br><b>Date:</b> " + taskDate;
                    }
                  });
                  tooltips.tooltipFor({
                    selector: ".baseline_jalon",
                    html: function (event, node) {
                      var taskDate = node.getAttribute("date-baseline");
                      var taskText = node.getAttribute("text-baseline");
                      var taskType = node.getAttribute("type-baseline");
                      return "<b>Type:</b> " + taskType + "</br><b>Desc.:</b> " + taskText + "</br><b>Date:</b> " + taskDate;
                    }
                  });
                  setTimeout(function () {
                    document.querySelectorAll('input[data-column]').forEach(function (input) {

                      input.addEventListener("input", function () {

                        var column = this.getAttribute('data-column');
                        if (this.value == null || this.value === "") {
                          delete tGridFilters[column]
                        } else {
                          tGridFilters[column] = this.value
                        }; // Met Ã  jour la variable de filtres dynamiques
                        gantt.refreshData(); // Met Ã  jour l'affichage des tÃ¢ches
                      });
                    });

                  }, 3000)

                });
                gantt.$resourcesStore = gantt.createDatastore({
                  name: gantt.config.resource_store,
                  type: "treeDatastore",
                  initItem: function (item) {
                    item.parent = item.parent;
                    item[gantt.config.resource_property] = item.parent;
                    item.open = true;
                    return item;
                  }
                });
                gantt.$resourcesStore.attachEvent("onAfterSelect", function (id) {
                  gantt.refreshData();
                });
                //gantt.init("gantt_area_div");

                gantt.attachEvent("onParse", function () {});

                gantt.$resourcesStore.attachEvent("onParse", function () {
                  var people = [];
                  gantt.$resourcesStore.eachItem(function (res) {
                    if (!gantt.$resourcesStore.hasChild(res.id)) {
                      var copy = gantt.copy(res);
                      copy.key = res.id;
                      copy.label = res.text;
                      copy.shift = res.shift;
                      people.push(copy);
                    }
                  });
                  gantt.updateCollection("people", people);
                });
                var empData = [];
                if (resData) {
                  for (i = 1; i < resData.length; i++) {
                    empData.push(resData[i]);
                  }
                }

                gantt.init("gantt_area_div");
                ////console.log("beforParse");


                var _Wo_data = [];
                Ext.getStore("gantt.projectCode.store").each(function (rec) {
                  _Wo_data.push(rec.data);
                });
                var vArr = [];

                var tasks = {
                  data: _Wo_data,
                  links: vProjectList.links // Pas utilisÃ© (lien entre taches du Gantt)
                };

                function renderElement(row, start, end, type, tasktext, key, adj) {

                  var vnewDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());

                  var sizes = gantt.getTaskPosition(row, vnewDate, vnewDate);
                  var el = document.createElement('div');
                  var vDateId = Ext.Date.format(start, 'Ymd')
                    var vId = row.id + '_' + vDateId;
                  var nCount = 0
                    nCount = parseInt(adj)
                    el.id = row.id + '#' + key;
                  el.className = 'baseline';
                  el.cust_object = "shutdown_planning";
                  switch (type) {
                  case "JALON":
                    el.className = 'baseline_jalon';
                    break;
                  case "DEBUT REEL":
                    el.className = 'baseline_date_debut';
                    break;
                  case "FIN REEL":
                    el.className = 'baseline_date_fin';
                    break;
                  case "FIN JOURNEE":
                    el.className = 'baseline_date_finj';
                    break;
                  }
                  if (type == "JALON") {
                    el.ondblclick = function (row, b, c) {
                      click_on_baseline(row, b, c, vBoilerList, DateSpeMap);
                    }
                  }
                  el.onclick = function (row, b, c) {
                    //click_on_baseline(row,b,c);
                  }
                  el.setAttribute("date-baseline", Ext.Date.format(start, 'd/m/Y H:i'));
                  el.setAttribute("type-baseline", type);
                  el.setAttribute("text-baseline", tasktext);
                  el.style.left = sizes.left + ((1 + nCount) * 15) + 'px';
                  el.style.width = '9px'; //sizes.width + 'px';
                  el.style.top = sizes.top + gantt.config.task_height + 9 + 'px';

                  return el;

                }

                gantt.addTaskLayer({
                  renderer: {
                    render: function draw_planned(task) {
                      var result = null;
                      if (task.type == "Project" && task.dds_evt_due) {
                        if (Ext.isDate(task.dds_evt_due)) {
                          var sizes = gantt.getTaskPosition(task, new Date(task.dds_evt_due), new Date(task.dds_evt_due));
                          result = document.createElement("div");
                          result.setAttribute("cust_object", "shutdown_planning");
                          result.id = task.id + '_div1';
                          var el = document.createElement('div');
                          el.id = task.id + '#B1';
                          el.className = 'baseline_jalon';
                          el.setAttribute("cust_object", "shutdown_planning");
                          el.setAttribute("date-baseline", Ext.Date.format(new Date(task.dds_evt_due), 'd/m/Y H:i'));
                          el.setAttribute("type-baseline", "Due date");
                          el.style.left = sizes.left + ((1) * 15) + 'px';
                          el.style.width = '9px';
                          el.setAttribute("text-baseline", task.text);
                          el.style.top = sizes.top + gantt.config.task_height + 9 + 'px';
                          result.appendChild(el)
                        }
                      }
                      if (task.type == "Activity") {
                        //afficher ici les planifs par date et par tache
                        var vListToCreated = [];

                        if ( !Ext.isEmpty(Ext.getStore('gantt.taskschedemp.store')) && Ext.getStore('gantt.taskschedemp.store').getById(task.id)) {
                          var vListOfSchedules = Ext.getStore('gantt.taskschedemp.store').getById(task.id).data.data
                            vListOfSchedules.forEach(function (rec) {
                              const targetId = Ext.Date.format(new Date(rec.sched_date), 'm/d/Y')
                                const newData = {
                                date: new Date(rec.sched_date),
                                per_desc: rec.per_desc,
                                per_code: rec.per_code,
                                sched_hours: rec.sched_hours
                              };
                              let targetItem = vListToCreated.find(item => item.id === targetId);
                              if (targetItem) {
                                targetItem.data.push(newData);
                              } else {
                                vListToCreated.push({
                                  id: targetId,
                                  data: [newData]
                                });
                              }

                            })
                        }
                        var nCount = 0;
                        if (vListToCreated.length > 0) {
                          result = document.createElement("div");
                          result.setAttribute("cust_object", "shutdown_planning");
                          result.id = task.id + '_div1';
                          vListToCreated.forEach(function (rec1) {
                            var vText;
                            nCount++;

                            vText = '<table border="1" cellspacing="0" cellpadding="8" width="100%">';
                            rec1.data.forEach(function (rec2) {
                              vText = vText + '<tr><td>' + rec2.per_desc + '</td><td> ' + rec2.sched_hours + ' hrs</td></tr>'

                            })
                            vText = vText + '</table>';
                            var sizes = gantt.getTaskPosition(task, new Date(rec1.id), new Date(rec1.id));

                            var el = document.createElement('div');
                            el.id = task.id + '#B' + nCount;
                            el.className = 'baseline_date_debut';
                            el.setAttribute("cust_object", "shutdown_planning");
                            el.setAttribute("date-baseline", Ext.Date.format(new Date(rec1.id), EAM.AppData._appconfig.map.dateformat));
                            el.setAttribute("type-baseline", "Schedule");
                            el.style.left = sizes.left + ((2) * 15) + 'px';
                            el.style.width = '9px';
                            el.setAttribute("text-baseline", vText);
                            el.style.top = sizes.top + gantt.config.task_height + 9 + 'px';
                            result.appendChild(el)
                          })
                        }

                      }

                      return result;
                    },
                    // define getRectangle in order to hook layer with the smart rendering
                    getRectangle: function (task, view) {
                      return true;

                    }
                  }
                });

                gantt.$resourcesStore.parse(empData);
                var v = gantt.parse(tasks);

                //Look for the dataspy sort options //


                // Event listeners to capture changes
                gantt.attachEvent("onAfterTaskAdd", function (id, item) {
                  Ext.getStore('gantt.undo.store').add({
                    type: "add",
                    task: item
                  })
                  undoStack.push({
                    type: "add",
                    task: item
                  });
                  redoStack = []; // Clear redo stack on new action
                });

                /*gantt.attachEvent("onAfterTaskUpdate", function(id, item) {
                console.log("onAfterTaskUpdate");
                });*/

                gantt.attachEvent("onAfterTaskDelete", function (id, item) {
                  Ext.getStore('gantt.undo.store').add({
                    type: "delete",
                    task: item
                  })
                  undoStack.push({
                    type: "delete",
                    task: item
                  });
                  redoStack = []; // Clear redo stack on new action
                });

                gantt.templates.grid_file = function (t) {
                  if (t.type == "Project") {
                    return "<div class='gantt_tree_icon gantt_work_order'></div>"
                  }
                  return "<div class='gantt_tree_icon gantt_activity'></div>"

                },

                gantt.templates.grid_folder = function (t) {
                  if (t.type == "Project") {
                    return "<div class='gantt_tree_icon gantt_work_order'></div>"
                  }
                  return "<div class='gantt_tree_icon gantt_activity'></div>"
                }

                // Undo function

                // Attacher un Ã©vÃ©nement pour la suppression de lien
                gantt.attachEvent("onLinkDblClick", function (id, link) {
                  // Ouvrir une boÃ®te de dialogue personnalisÃ©e pour confirmer la suppression ou modifier le lien


                  EAM.Messaging.showQuestion({
                    msg: vBoilerList["link_delete_confirm"],
                    buttons: EAM.MsgBox.YESNO,
                    fn: function (c) {
                      if (c === 'yes') {
                        gantt.deleteLink(id);
                      }
                    }
                  });

                  // Retourner false pour empÃªcher les actions par dÃ©faut lors du double-clic
                  return false;
                });

                gantt.attachEvent("onAfterLinkAdd", function (id, link) {
                  //console.log("Link added:", link);
                  link.color = "red";
                  link.type = "0";

                  const index = Link_data.findIndex(obj => obj.id === link.id);
                  if (index < 0) {
                    var linkData = {
                      id: link.id,
                      source: link.source,
                      target: link.target,
                      type: link.type
                    };
                    Link_data.push(linkData);
                    var vSave = document.getElementById("savebtn");
                    vSave.style.background = "lightgreen";
                    gantt.getTask(link.target).actudfchar30 = link.source.split('#')[0];
                    gantt.getTask(link.target).actudfnum01 = link.source.split('#')[1];
                    gantt.getTask(link.target).updated = 0;

                    if (sessionStorage.getItem("undoactionupdateLink") == "OK") {}
                    else {
                      Ext.getStore('gantt.undo.store').add({
                        type: "addLink",
                        task: link
                      })
                      undoStack.push({
                        type: "addLink",
                        task: link
                      });
                    }
                  }
                });

                gantt.attachEvent("onAfterLinkDelete", function (id, link) {
                  //console.log("Link added:", link);
                  const index = Link_removedata.findIndex(obj => obj.id === link.id);
                  if (index < 0) {
                    var linkData = {
                      id: link.id,
                      source: link.source,
                      target: link.target,
                      type: link.type
                    };
                    Link_removedata.push(linkData);
                    var vSave = document.getElementById("savebtn");
                    vSave.style.background = "lightgreen";
                    gantt.getTask(link.target).actudfchar30 = link.source.split('#')[0];
                    gantt.getTask(link.target).actudfnum01 = link.source.split('#')[1];
                    gantt.getTask(link.target).updated = 0;
                    if (sessionStorage.getItem("undoactionupdateLink") == "OK") {}
                    else {
                      Ext.getStore('gantt.undo.store').add({
                        type: "deleteLink",
                        task: link
                      })
                      undoStack.push({
                        type: "deleteLink",
                        task: link
                      });
                    }

                  }

                  //redoStack = []; // Clear redo stack on new action
                });

                function zoomTimeline(e) {
                  e.preventDefault();
                  var currentScale = gantt.config.cust_scale;

                  // On augmente ou diminue le zoom en fonction de la direction de la molette
                  if (e.deltaY < 0) {
                    switch (currentScale) {
                    case "4":
                      Ext.getCmp("viewmode_gantt").setValue("5") //setScaleConfig('5');
                      break;
                    case "5":
                      Ext.getCmp("viewmode_gantt").setValue("3") //setScaleConfig('3');
                      break;
                    case "3":
                      Ext.getCmp("viewmode_gantt").setValue("2") //setScaleConfig('2');
                      break;
                    case "2":
                      Ext.getCmp("viewmode_gantt").setValue("1") //setScaleConfig('1');
                      break;
                    }

                  } else {
                    switch (currentScale) {
                    case "5":
                      Ext.getCmp("viewmode_gantt").setValue("4") //setScaleConfig('4');
                      break;
                    case "3":
                      Ext.getCmp("viewmode_gantt").setValue("5") //setScaleConfig('5');
                      break;
                    case "2":
                      Ext.getCmp("viewmode_gantt").setValue("3") //setScaleConfig('3');
                      break;
                    case "1":
                      Ext.getCmp("viewmode_gantt").setValue("2") //setScaleConfig('2');
                      break;
                    }
                  }
                  gantt.render();
                }

                function zoomTimeline2(e) {
                  e.preventDefault();
                  var currentScale = gantt.config.cust_scale;

                  // On augmente ou diminue le zoom en fonction de la direction de la molette

                  switch (currentScale) {
                  case "4":
                    Ext.getCmp("viewmode_gantt").setValue("5") //setScaleConfig('5');
                    break;
                  case "5":
                    Ext.getCmp("viewmode_gantt").setValue("3") //setScaleConfig('3');
                    break;
                  case "3":
                    Ext.getCmp("viewmode_gantt").setValue("2") //setScaleConfig('2');
                    break;
                  case "2":
                    Ext.getCmp("viewmode_gantt").setValue("1") //setScaleConfig('1');
                    break;
                  }

                  gantt.render();
                }

                gantt.attachEvent("onTemplatesReady", function () {
                  document.querySelector(".gantt_task_scale").addEventListener('wheel', function (e) {
                    e.preventDefault();
                    var currentScale = gantt.config.cust_scale;

                    // On augmente ou diminue le zoom en fonction de la direction de la molette
                    if (e.deltaY < 0) {
                      switch (currentScale) {
                      case "4":
                        Ext.getCmp("viewmode_gantt").setValue("5") //setScaleConfig('5');
                        break;
                      case "5":
                        Ext.getCmp("viewmode_gantt").setValue("3") //setScaleConfig('3');
                        break;
                      case "3":
                        Ext.getCmp("viewmode_gantt").setValue("2") //setScaleConfig('2');
                        break;
                      case "2":
                        Ext.getCmp("viewmode_gantt").setValue("1") //setScaleConfig('1');
                        break;
                      }

                    } else {
                      switch (currentScale) {
                      case "5":
                        Ext.getCmp("viewmode_gantt").setValue("4") //setScaleConfig('4');
                        break;
                      case "3":
                        Ext.getCmp("viewmode_gantt").setValue("5") //setScaleConfig('5');
                        break;
                      case "2":
                        Ext.getCmp("viewmode_gantt").setValue("3") //setScaleConfig('3');
                        break;
                      case "1":
                        Ext.getCmp("viewmode_gantt").setValue("2") //setScaleConfig('2');
                        break;
                      }
                    }
                    gantt.render();

                  })

                });

                // Ajout de l'Ã©couteur d'Ã©vÃ©nement de dÃ©filement sur l'Ã©lÃ©ment Gantt
                //document.getElementById('gantt_area_div').addEventListener('wheel', zoomTimeline);


                //	//console.log("endofParse");
                EAM.Utils.unmask(Ext.ComponentQuery.query('#custom_global_div')[0]);

                gantt.eachTask(function (etask) {
                  /*var vParent = gantt.getTask(etask.id).parent;
                  if (vParent) {
                  if (gantt.getTask(vParent).start_date > gantt.getTask(etask.id).start_date) {
                  gantt.getTask(vParent).start_date = gantt.getTask(etask.id).start_date
                  };
                  };*/// end if
                }); // end each

                //gantt.sort('id', false);
                gantt.showDate(today);
                previousdate();

                //gantt.init("gantt_area_div");

                INFORGLOBALS.refreshresourcegrid = false;
              }

              function displayGantt() {
                //	//console.log("onEntreDansDisplayGantt()");
                //gantt.destructor();


                scale_cell_array = []; // TODO: A supprimer peut-Ãªtre
                //////console.log("displayGantaffDateMax");

                dMaxDate = new Date(dMaxDate.setMonth(dMaxDate.getMonth() + 1));
                //////console.log(dMaxDate);
                var dStartDate = new Date();
                dStartDate = new Date(Ext.getCmp('StartDate').rawDate);
                var dTestEndDate = new Date(dStartDate);
                dTestEndDate.setDate(dTestEndDate.getDate() + 900);
                if (dMaxDate > dTestEndDate) {
                  dMaxDate = new Date(dTestEndDate);
                }
                gantt.config.start_date = dStartDate.getFullYear() + '-' + ("0" + (dStartDate.getMonth() + 1)).toString().slice(-2) + '-' + ("0" + dStartDate.getDate()).toString().slice(-2);
                gantt.config.end_date = dMaxDate.getFullYear() + '-' + ("0" + (dMaxDate.getMonth() + 1)).toString().slice(-2) + '-' + ("0" + dMaxDate.getDate()).toString().slice(-2);
                gantt.config.show_progress = false;
                gantt.config.drag_resize = true; // Permet d'augmenter la durÃ©e
                gantt.config.show_links = true;
                gantt.config.drag_links = true;
                gantt.config.smart_rendering = true; // TODO: A Ã©tudier
                gantt.config.static_background = true;
                gantt.config.show_task_cells = true; // TODO: A Ã©tudier
                gantt.config.bar_height = 18;
                gantt.config.row_height = 30;
                gantt.config.scale_height = "100";
                gantt.config.show_loading = true;
                gantt.config.time_step = Ext.getCmp("disp_minute").getValue(); //15;
                gantt.config.round_dnd_dates = false;
                gantt.config.branch_loading = false;
                gantt.config.smart_scales = true;
                gantt.config.work_time = false;
                gantt.config.duration_unit = "minute";
                gantt.config.duration_step = 1;
                // DÃ©finitions des colonnes Ã  afficher rÃ©cupÃ©rÃ©es de la var ArrEvents
                //var menu = new dhtmlXMenuObject();
                gantt.config.undo = true;
                gantt.config.redo = true;
                gantt.config.round_dnd_dates = false;

                gantt.config.undo_actions = {
                  update: "update"
                  //,remove:"remove" // remove an item from the datastore
                  //,add:"add"
                };
                gantt.config.task_height = 16;

                gantt.addShortcut("Enter", function (e) {
                  //	//console.log("");
                }, "taskRow");
                gantt.attachEvent("onBeforeSelect", function (id, task) {
                  return false;
                });

                gantt.attachEvent("onBeforeTaskDisplay", function (id, task) {

                  var selection = Ext.getCmp('searchgantt')
                    let bCheck = false;

                  /*if(!task.$open && !Ext.isEmpty(selection.value)){
                  task.$open = true;
                  }*/
                  /*else{
                  task.$open = false;
                  }*/
                  if (!selection.value) {
                    bCheck = true;
                  }
                  if (task.tags.toUpperCase().indexOf(selection.value.toUpperCase()) > -1) {
                    bCheck = true;
                  } // end if
                  if (Object.keys(tGridFilters).length > 0) {
                    for (var key in tGridFilters) {
                      if (tGridFilters[key]) {
                        if (task[key].toString().toLowerCase().indexOf(tGridFilters[key].toLowerCase()) === -1 && tGridFilters[key] != "") {
                          bCheck = false; // Masquer la tÃ¢che si elle ne correspond pas au filtre
                        }
                      }
                    }
                  }

                  return bCheck;
                }); // end attachEvent
                /*
                gantt.addCalendar({
                id:"custom",
                worktime: {
                days: [ 1, 1, 1, 1, 1, 0, 0],
                }
                });
                 */
                var vListColumns = []
                var vStoreID = [];
                var dateEditor = {
                  xtype: 'uxdatetime',
                  map_to: "end_date"
                };

                gantt.ext.inlineEditors.attachEvent("onEditStart", function (state) {
                  console.log(state)
                });

                /* vListColumns.push({
                  name: "icon1",
                  id: "icon1",
                  label: "", //vBoilerList["column_wodescription"],
                  header: "", //vBoilerList["column_wodescription"],
                  width: "30",
                  typeColumn: "icon",
                  template: function (task) {
                    if (task.type === "Project" && !task.$open) {
                      for (i = 0; i < vProjectList.conflict_parts.length; i++) {
                        if (gantt.getChildren(task.id).indexOf(vProjectList.conflict_parts[i].woact) >= 0) {
                          return "<div class='conflict_part'></div>"
                        }
                      }
                    } else {
                      for (i = 0; i < vProjectList.conflict_parts.length; i++) {
                        if (vProjectList.conflict_parts[i].woact == task.id) {
                          return "<div class='conflict_part'></div>"
                        }
                      }

                    }

                    return ""
                  },
                  resize: true

                });
                vListColumns.push({
                  name: "icon2",
                  id: "icon2",
                  label: "", //vBoilerList["column_wodescription"],
                  header: "", //vBoilerList["column_wodescription"],
                  width: "30",
                  typeColumn: "icon",
                  template: function (task) {
                    if (task.type === "Project") {
                      for (i = 0; i < vProjectList.conflict_tools.length; i++) {
                        if (gantt.getChildren(task.id).indexOf(vProjectList.conflict_tools[i].woact) >= 0) {
                          return "<div class='conflict_tool'></div>"
                        }
                      }
                    } else {
                      for (i = 0; i < vProjectList.conflict_tools.length; i++) {
                        if (vProjectList.conflict_tools[i].woact == task.id) {
                          return "<div class='conflict_tool'></div>"
                        }
                      }
                    }

                    return ""
                  },
                  resize: true

                }); */

                vListColumns.push({
                  name: "id",
                  label: "<input type='text' id='id_text' data-column='id' placeholder='Id'  style='width:100%;'/>",
                  width: "150",
                  tree: true,
                  resize: true,
                  typeColumn: "varchar"
                });

               /* vListColumns.push({
                  name: "desc",
                  id: "evt_desc",
                  label: "<input type='text' id='desc_text' data-column='desc' placeholder='" + vBoilerList["column_wodescription"] + "'  style='width:100%;'/>",
                  header: vBoilerList["column_wodescription"],
                  width: "300",
                  resize: true,
                  typeColumn: "varchar"

                });
                vListColumns.push({
                name: "act_act",
                id: "act_act",
                label: vBoilerList["column_opdescription"],//gantt.locale.labels.column_wodescription,
                header: vBoilerList["column_opdescription"],//gantt.locale.labels.column_wodescription,
                width: "80",
                resize: true

                });*/
                vListColumns.push({
                  name: "start_date",
                  id: "evt_target",
                  label: vBoilerList["column_start_date"],
                  header: vBoilerList["column_start_date"],
                  width: '100',
                  resize: true,
                  hide: true,
                  typeColumn: "date",
                  template: function (obj) {

                    return Ext.Date.format(new Date(obj.start_date), EAM.AppData._appconfig.map.dateformat + ' H:i')

                  }
                  /*,
                  editor: start_dateEditor */
                });
                vListColumns.push({
                  name: "end_date",
                  id: "evt_schedend",
                  label: vBoilerList["column_end_date"],
                  header: vBoilerList["column_end_date"],
                  width: '100',
                  resize: true,
                  hide: true,
                  typeColumn: "date",
                  template: function (obj) {
                    var dDate = new Date(obj.end_date);

                    return Ext.Date.format(new Date(obj.end_date), EAM.AppData._appconfig.map.dateformat + ' H:i')
                  }
                });

                /*	vListColumns.push({
                name: "equipment",
                id: "evt_object",
                label: vBoilerList["column_equipmentcode"],
                header: vBoilerList["column_equipmentcode"],
                width: "143",
                resize: true
                });*/

                var vDDsConfigStore = Ext.getStore('gantt.dataspy.settings');

                vDDsConfigStore.each(function (rec) {
                  var vFieldId;
                  var VFieldName;

                  vFieldId = rec.data.id;
                  VFieldName = rec.data.id;

                  if (rec.data.id == "dds_evt_target") {
                    vFieldId = "evt_target";
                    VFieldName = "start_date";
                  }
                  if (rec.data.id == "dds_evt_schedend") {
                    vFieldId = "evt_schedend";
                    VFieldName = "end_date";
                  }
                  if (rec.data.typeColumn == "DATETIME") {
                    vListColumns.push({
                      name: VFieldName,
                      id: vFieldId,
                      label: "<input type='text' id='" + VFieldName + "_text' data-column='" + VFieldName + "' placeholder='" + rec.data.description + "'  style='width:100%;'/>",
                      header: rec.data.description,
                      width: rec.data.columnwidth,
                      resize: true,
                      typeColumn: rec.data.typeColumn,
                      template: function (obj) {
                        if (obj[VFieldName] != "" && Ext.isDate(obj[VFieldName])) {
                          var dDate = new Date(obj[VFieldName]);
                          if (dDate.getHours() == "23" && dDate.getMinutes() == "59") {
                            dDate.setHours(0);
                            dDate.setMinutes(0);
                          }
                          return Ext.Date.format(new Date(dDate), EAM.AppData._appconfig.map.dateformat + ' H:i')
                        } else {
                          return obj[VFieldName]
                        }

                      }
                    });
                  } else {
                    if (rec.data.typeColumn == "DATE") {
                      vListColumns.push({
                        name: VFieldName,
                        id: vFieldId,
                        label: "<input type='text' id='" + VFieldName + "_text' data-column='" + VFieldName + "' placeholder='" + rec.data.description + "'  style='width:100%;'/>",
                        header: rec.data.description,
                        width: rec.data.columnwidth,
                        resize: true,
                        typeColumn: rec.data.typeColumn,
                        template: function (obj) {
                          if (obj[VFieldName] != "" && Ext.isDate(obj[VFieldName])) {
                            var dDate = new Date(obj[VFieldName]);
                            if (dDate.getHours() == "23" && dDate.getMinutes() == "59") {
                              dDate.setHours(0);
                              dDate.setMinutes(0);
                            }
                            return Ext.Date.format(new Date(obj[dDate]), EAM.AppData._appconfig.map.dateformat)
                          } else {
                            return obj[VFieldName]
                          }
                        }
                      });

                    } else {
                      vListColumns.push({
                        name: VFieldName,
                        id: vFieldId,
                        label: "<input type='text' id='" + VFieldName + "_text' data-column='" + VFieldName + "' placeholder='" + rec.data.description + "'  style='width:100%;'/>",
                        header: rec.data.description,
                        width: rec.data.columnwidth,
                        resize: true,
                        typeColumn: rec.data.typeColumn
                      });

                    }
                  }

                });
                gantt.config.columns = vListColumns;
                gantt.config.date_grid = '%' + EAM.AppData._appconfig.map.dateformat.replaceAll(EAM.AppData._appconfig.map.dateseparator, EAM.AppData._appconfig.map.dateseparator + "%");
                gantt.attachEvent("onTaskClick", function (id, e) {
                  return true
                });

                // TODO: vÃ©rifier confusion des date_to_str (var/function....)
                var date_to_str = gantt.date.date_to_str(gantt.config.task_date);
                var today = new Date();
                gantt.addMarker({
                  start_date: today,
                  css: "today",
                  text: vBoilerList["currenttext"], //"Aujourd'hui",
                  title: "Date: " + date_to_str(today)
                });
                // Gestion des events sur le Gantt
                gantt.attachEvent("onBeforeDragStart", function (vTaskId, e) {
                  //////console.log("onBeforeDragStart");
                });
                function deselect(e) {
                  $('.pop').slideFadeToggle(function () {
                    e.removeClass('selected');
                  });
                }
                gantt.attachEvent("onBeforeLinkAdd", function (id, link) {
                  // Exemple de rÃ¨gles pour empÃªcher certains types de liens
                  // VÃ©rifie que la source et la cible ne sont pas Ã©gales (aucun lien vers soi-mÃªme)
                  if (WOFieldsAttributes.hasOwnProperty("schedstartdate")) {
                    if (WOFieldsAttributes.schedstartdate == "protected" || WOFieldsAttributes.schedstartdate == "hidden") {
                      return false;
                    }
                  }

                  if (WOFieldsAttributes.hasOwnProperty("schedstartdate") && WOFieldsAttributes.hasOwnProperty("udfdate07")) {
                    if (WOFieldsAttributes.schedstartdate == "protected" || WOFieldsAttributes.schedstartdate == "hidden" || WOFieldsAttributes.udfdate07 == "protected" || WOFieldsAttributes.udfdate07 == "hidden") {
                      return false;
                    }
                  }

                  if (link.type != "0") {
                    return false;
                  }
                  let vTaskParent = gantt.getTask(link.source);
                  let vTaskChild = gantt.getTask(link.target);
                  let vContinue = true;

                  /*Case 1 : WO --> OP of same WO*/
                  if (vTaskParent.type === "Project" && vTaskChild.type === "Activity" && vTaskChild.$rendered_parent === vTaskParent.id) {
                    vContinue = false
                  }
                  /*Case 2 : OP --> Parent WO*/
                  if (vTaskParent.type === "Activity" && vTaskChild.type === "Project") {
                    vContinue = false
                  }
                  /*case 3 : WO --> WO */
                  if (vTaskParent.type === "Project" && vTaskChild.type === "Project") {
                    let vTaskChildChildren = gantt.getChildren(vTaskChild.id);
                    vTaskChildChildren.forEach(function (_childid) {
                      if (gantt.isTaskExists(_childid)) {
                        let _vTaskChild = gantt.getTask(_childid);
                        _vTaskChild.$target.forEach(function (_link) {
                          vContinue = false;
                        })
                      }

                    })
                    vTaskChild.$target.forEach(function (_link) {

                      let vLink = gantt.getLink(_link);
                      if (gantt.isTaskExists(vLink.source)) {
                        let vSource = gantt.getTask(vLink.source);
                        if (vSource.$rendered_parent === vTaskParent.id) {
                          vContinue = false;
                        }
                      }

                    })
                  }
                  /*Case 4 : WO --> OP of another WO*/
                  if (vTaskParent.type === "Project" && vTaskChild.type === "Activity") {
                    vContinue = false;
                  }
                  /*Case 5 : OP --> OP of another WO*/
                  if (vTaskParent.type === "Activity" && vTaskChild.type === "Activity" && vTaskChild.$rendered_parent != vTaskParent.$rendered_parent) {
                    if (gantt.isTaskExists(vTaskChild.$rendered_parent) && gantt.isTaskExists(vTaskParent.$rendered_parent)) {
                      let vChildParent = gantt.getTask(vTaskChild.$rendered_parent);
                      let vParentParent = gantt.getTask(vTaskParent.$rendered_parent);
                      if (vChildParent.$target.length > 0) {
                        vContinue = false;
                      } else {
                        let vTaskChildChildren = gantt.getChildren(vTaskChild.$rendered_parent);
                        vTaskChildChildren.forEach(function (_childid) {
                          if (gantt.isTaskExists(_childid)) {
                            let _vTaskChild = gantt.getTask(_childid);

                            _vTaskChild.$target.forEach(function (_link) {
                              let vLink = gantt.getLink(_link);
                              if (gantt.isTaskExists(vLink.source)) {
                                let vSource = gantt.getTask(vLink.source);
                                if (vSource === vParentParent.id) {
                                  vContinue = false;
                                }
                              }
                            })
                          }
                        })
                      }
                    }
                  }

                  return vContinue;

                });
                gantt.attachEvent("onAfterTaskUpdate", function (id, task, is_new) {
                  console.log("onAfterTaskUpdate");
                  let actionUpdate = false;

                  var vUpdateID = task.id + '_' + Date.now();

                  let treeStack = [];
                  if (sessionStorage.getItem("undoactionupdate") == "OK") {
                    actionUpdate = true;
                  } else {
                    addUndo('update', id, task, task.id, vUpdateID);
                  }
                  if (sessionStorage.getItem("redoactionupdate") == "OK") {
                    actionUpdate = true;
                  }

                  if (task.wo != undefined) {
                    if (task.wo.indexOf("(") < 0) {
                      var vSave = document.getElementById("savebtn");
                      vSave.style.background = "lightgreen";

                    }
                  }

                  function getChildren(taskId, data) {
                    const children = [];

                    // Chercher tous les enfants directs de la tÃ¢che donnÃ©e
                    const directChildren = data.filter(item => item.task === taskId);

                    // Parcourir chaque enfant direct
                    directChildren.forEach(child => {
                      children.push({
                        "child": child.child,
                        "type": child.type
                      }); // Ajouter l'enfant Ã  la liste des rÃ©sultats
                      // Rechercher rÃ©cursivement les enfants de cet enfant
                      children.push(...getChildren(child.child, data));
                    });

                    return children;
                  }

                  gantt.getTaskByTime().forEach(function (_task) {
                    if (_task.$source.length > 0) {
                      _task.$source.forEach(function (_link) {
                        treeStack.push({
                          "task": _task.id,
                          "child": gantt.getLink(_link).target,
                          "type": "link"
                        });
                      })
                    }
                    if (gantt.getChildren(_task.id).length > 0) {
                      gantt.getChildren(_task.id).forEach(function (_child) {
                        treeStack.push({
                          "task": _task.id,
                          "child": _child,
                          "type": "child"
                        });
                      })
                    }

                  })
                  let ListOfChildrenDone = [];
                  //we are updating the work order level
                  if (task.type === "Project" || task.type === "Activity") {
                    var vTruncPrevStart = new Date(task.prev_start);
                    var vTruncNewStart = new Date(task.start_date);
                    var vTruncPrevEnd = new Date(task.prev_end);
                    var vTruncNewEnd = new Date(task.end_date);
                    var vDiff = vTruncNewStart.getTime() - vTruncPrevStart.getTime();
                    var vDiff2 = vTruncNewEnd.getTime() - vTruncPrevEnd.getTime();
                    if (vDiff != 0 || vDiff2 != 0) {

                      //Management of the activities of the WO
                      var vListOfChildren = getChildren(task.id, treeStack);
                      var vCheckupated = 0;

                      for (c = 0; c < vListOfChildren.length; c++) {

                        if (gantt.isTaskExists(vListOfChildren[c].child) && ListOfChildrenDone.indexOf(vListOfChildren[c].child) < 0 && !actionUpdate) {

                          var vChildTask = gantt.getTask(vListOfChildren[c].child);
                          ListOfChildrenDone.push(vChildTask.id)
                          let vChildType = vListOfChildren[c].type;
                          let isChildOfLinkedParent = false;
                          if (vChildType == "child" && vChildTask.type == "Activity") {
                            let _ParentOfChild = gantt.getParent(vChildTask.id);
                            let _result = vListOfChildren.find(item => item.child === _ParentOfChild);
                            if (_result) {
                              if (_result.type === "link") {
                                isChildOfLinkedParent = true;
                              }
                            }
                          }
                          if ((vChildTask.type === "Activity" && isChildOfLinkedParent && Ext.getCmp("PostPoneOp").checked) || ((vChildType === "child" && vChildTask.$rendered_parent === task.id) || (vChildType === "link" && vChildTask.$rendered_parent != task.id && Ext.getCmp("PostPoneOp").checked) || (vChildType === "link" && Ext.getCmp("PostPoneOp").checked))) {
                            var vChildStarDate = new Date(vChildTask.start_date);
                            var vChildNewStartDate = new Date(vChildTask.start_date);
                            vChildNewStartDate.setTime(vChildNewStartDate.getTime() + vDiff2);
                            var vChildNewEndDate = new Date(vChildTask.end_date);
                            vChildNewEndDate.setTime(vChildNewEndDate.getTime() + vDiff2);
                            var vDuration = vChildTask.dds_act_est
                             // var vData = vSupplierList.data;
                            var dInitDate = Ext.Date.format(vChildStarDate, 'm/d/Y');
                            var dNewDate = Ext.Date.format(vChildNewStartDate, 'm/d/Y');
                            var vOldIndex = null;
                            var vNewIndex = null;
                            if (vChildTask.dds_act_supplier === "") {
                              try {
                                var vSplitHours = Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("hours")

                                  Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("dates").forEach(function (_Date) {
                                    dInitDate = Ext.Date.format(new Date(_Date), 'm/d/Y');
                                    //vOldIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_mrc && item.date === dInitDate && item.trade == '*');
                                    var vNewValue = 0
                                   /*    if (vData[vOldIndex]) {
                                        vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vSplitHours))
                                          vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(1)))
                                      } */
                                  });
                              } catch (err) {}

                              var dDateTemp = new Date(Ext.Date.format(vChildNewStartDate, 'm/d/Y')),
                              dDateTemp2 = new Date(Ext.Date.format(vChildNewEndDate, 'm/d/Y')),
                              dListofDates = [],
                              nOccurr = Ext.Date.diffDays(dDateTemp, dDateTemp2) + 1;
                              var dTemp = new Date();
                              vSplitHours = parseFloat((parseFloat(vChildTask.dds_act_est) / nOccurr).toFixed(1));

                              while (dDateTemp <= dDateTemp2) {
                                dInitDate = Ext.Date.format(dDateTemp, 'm/d/Y');
                                //vNewIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_mrc && item.date === dInitDate && item.trade == '*');
                                var vNewValue = 0
                                /*   if (vData[vNewIndex]) {
                                    vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vSplitHours))
                                      vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                  } */
                                  dTemp = new Date(dDateTemp);
                                dListofDates.push(dTemp);
                                dDateTemp.setDate(dDateTemp.getDate() + 1);
                              }
                              try {
                                Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("dates", dListofDates);
                                Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("hours", vSplitHours);

                              } catch (err) {}

                            } else {
                              try {
                                var vSplitHours = Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("hours")

                                  Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("dates").forEach(function (_Date) {
                                    dInitDate = Ext.Date.format(new Date(_Date), 'm/d/Y');
                                    //vOldIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_supplier && item.date === dInitDate && item.trade == '*');
                                    var vNewValue = 0
                                    /*   if (vData[vOldIndex]) {
                                        vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vSplitHours))
                                          vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                      } */
                                  });

                              } catch (err) {}
                              var dDateTemp = new Date(Ext.Date.format(vChildNewStartDate, 'm/d/Y')),
                              dDateTemp2 = new Date(Ext.Date.format(vChildNewEndDate, 'm/d/Y')),
                              dListofDates = [],
                              nOccurr = Ext.Date.diffDays(dDateTemp, dDateTemp2) + 1;
                              var dTemp = new Date();

                              vSplitHours = parseFloat((parseFloat(vChildTask.dds_act_est) / nOccurr).toFixed(1));

                              while (dDateTemp <= dDateTemp2) {
                                dInitDate = Ext.Date.format(dDateTemp, 'm/d/Y');
                                //vNewIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_supplier && item.date === dInitDate && item.trade == '*');
                                var vNewValue = 0
                                /*   if (vData[vNewIndex]) {
                                    vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vSplitHours))
                                      vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                  } */
                                  dTemp = new Date(dDateTemp);
                                dListofDates.push(dTemp);
                                dDateTemp.setDate(dDateTemp.getDate() + 1);
                              }
                              try {
                                Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("dates", dListofDates);
                                Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("hours", vSplitHours);
                              } catch (err) {}

                            }
                            vChildTask.start_date = new Date(vChildTask.start_date.getTime() + vDiff2);

                            vChildTask.end_date = new Date(vChildTask.end_date.getTime() + vDiff2);
                            vChildTask.duration = gantt.calculateDuration(vChildTask.start_date, vChildTask.end_date);

                            addUndo('update', vChildTask.id, vChildTask, task.id, vUpdateID);
                            vChildTask.prev_start = vChildTask.start_date
                              vChildTask.prev_end = vChildTask.end_date
                              vCheckupated = 1;
                            vChildTask.updated = 0;

                            if (vChildTask.type == "Activity" && vChildTask.$rendered_parent != task.id) {
                              let vParentTask = gantt.getTask(vChildTask.$rendered_parent);
                              let vThisListOfChildren = gantt.getChildren(vChildTask.$rendered_parent);
                              let dNewStartDate = new Date(vChildTask.start_date);
                              let dNewEndDate = new Date(vChildTask.end_date);
                              vThisListOfChildren.forEach(function (_child) {
                                let _childTask = gantt.getTask(_child)
                                  if (new Date(_childTask.start_date) < dNewStartDate) {
                                    dNewStartDate = new Date(_childTask.start_date);

                                  }
                                  if (new Date(_childTask.end_date) > dNewEndDate) {
                                    dNewEndDate = new Date(_childTask.end_date);

                                  }

                              });

                              vParentTask.start_date = dNewStartDate;

                              vParentTask.end_date = dNewEndDate;

                              vParentTask.duration = gantt.calculateDuration(vParentTask.start_date, vParentTask.end_date);
                              vParentTask.updated = 0;
                              addUndo('update', vParentTask.id, vParentTask, task.id, vUpdateID);
                              vParentTask.prev_start = dNewStartDate;
                              vParentTask.prev_end = dNewEndDate;

                            }
                          }

                        }

                      }
                      //Management of the linked work orders or activities
                      if (vCheckupated == 1) {
                        gantt.refreshData();
                      }
                      if (task.type === "Activity") {
                        var vChildTask = task;
                        var vChildStarDate = new Date(vChildTask.prev_start);
                        var vChildNewStartDate = new Date(vChildTask.prev_start);
                        vChildNewStartDate.setTime(vChildNewStartDate.getTime() + vDiff2);
                        var vDuration = vChildTask.dds_act_est
                          //var vData = vSupplierList.data;
                        var dInitDate = Ext.Date.format(vChildStarDate, 'm/d/Y');
                        var dNewDate = Ext.Date.format(vChildNewStartDate, 'm/d/Y');
                        var vOldIndex = null;
                        var vNewIndex = null;
                        var dTemp = new Date();

                        if (vChildTask.dds_act_supplier === "") {
                          var vSplitHours = Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("hours")

                            Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("dates").forEach(function (_Date) {
                              dInitDate = Ext.Date.format(new Date(_Date), 'm/d/Y');
                             // vOldIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_mrc && item.date === dInitDate && item.trade == '*');
                              var vNewValue = 0
                              /*   if (vData[vOldIndex]) {
                                  vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vSplitHours))
                                    vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                } */
                            });

                          var dDateTemp = new Date(Ext.Date.format(vChildTask.start_date, 'm/d/Y')),
                          dDateTemp2 = new Date(Ext.Date.format(vChildTask.end_date, 'm/d/Y')),
                          dListofDates = [],
                          nOccurr = Ext.Date.diffDays(dDateTemp, dDateTemp2) + 1;
                          vSplitHours = parseFloat((parseFloat(vChildTask.dds_act_est) / nOccurr).toFixed(1));

                          while (dDateTemp <= dDateTemp2) {
                            dInitDate = Ext.Date.format(dDateTemp, 'm/d/Y');
                            //vNewIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_mrc && item.date === dInitDate && item.trade == '*');
                            var vNewValue = 0
                             /*  if (vData[vNewIndex]) {
                                vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vSplitHours))
                                  vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                              } */
                              dTemp = new Date(dDateTemp);
                            dListofDates.push(dTemp);
                            dDateTemp.setDate(dDateTemp.getDate() + 1);
                          }
                          Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("dates", dListofDates);
                          Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("hours", vSplitHours);

                        } else {
                          var vSplitHours = Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("hours")

                            Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("dates").forEach(function (_Date) {
                              dInitDate = Ext.Date.format(new Date(_Date), 'm/d/Y');
                              //vOldIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_supplier && item.date === dInitDate && item.trade == '*');
                              var vNewValue = 0
                               /*  if (vData[vOldIndex]) {
                                  vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vSplitHours))
                                    vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                } */
                            });

                          var dDateTemp = new Date(Ext.Date.format(vChildTask.start_date, 'm/d/Y')),
                          dDateTemp2 = new Date(Ext.Date.format(vChildTask.end_date, 'm/d/Y')),
                          dListofDates = [],
                          nOccurr = Ext.Date.diffDays(dDateTemp, dDateTemp2) + 1;
                          vSplitHours = parseFloat((parseFloat(vChildTask.dds_act_est) / nOccurr).toFixed(1));

                          while (dDateTemp <= dDateTemp2) {
                            dInitDate = Ext.Date.format(dDateTemp, 'm/d/Y');
                           // vNewIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_supplier && item.date === dInitDate && item.trade == '*');
                            var vNewValue = 0
                             /*  if (vData[vNewIndex]) {
                                vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vSplitHours))
                                  vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                              } */
                              dTemp = new Date(dDateTemp);
                            dListofDates.push(dTemp);
                            dDateTemp.setDate(dDateTemp.getDate() + 1);
                          }
                          Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("dates", dListofDates);
                          Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("hours", vSplitHours);

                        }

                        if (!actionUpdate) {

                          let vParentTask = gantt.getTask(vChildTask.$rendered_parent);
                          let vThisListOfChildren = gantt.getChildren(vChildTask.$rendered_parent);
                          let dNewStartDate = new Date(vChildTask.start_date);
                          let dNewEndDate = new Date(vChildTask.end_date);

                          vThisListOfChildren.forEach(function (_child) {
                            let _childTask = gantt.getTask(_child)
                              if (_childTask.start_date < dNewStartDate) {
                                dNewStartDate = new Date(_childTask.start_date);

                              }
                              if (_childTask.end_date > dNewEndDate) {
                                dNewEndDate = new Date(_childTask.end_date);

                              }

                          });

                          vParentTask.start_date = dNewStartDate;
                          vParentTask.end_date = dNewEndDate;
                          vParentTask.duration = gantt.calculateDuration(vParentTask.start_date, vParentTask.end_date);
                          vParentTask.updated = 0;
                          addUndo('update', vParentTask.id, vParentTask, task.id, vUpdateID);
                          vParentTask.prev_start = dNewStartDate;
                          vParentTask.prev_end = dNewEndDate;
                        }

                      }
                      gantt.getTask(task.id).updated = 0;
                      gantt.getTask(task.id).prev_start = task.start_date;
                      gantt.getTask(task.id).prev_end = task.end_date;
                      gantt.refreshData();
                    } else {
                      if (1 == 2) {

                        if (task.type == "Activity") {
                          let vParentTask = gantt.getTask(task.$rendered_parent);
                          let vThisListOfChildren = gantt.getChildren(task.$rendered_parent);
                          let dNewStartDate = new Date(task.start_date);
                          let dNewEndDate = new Date(task.end_date);
                          let dTemp = new Date();

                          var vData = vSupplierList.data;
                          vThisListOfChildren.forEach(function (_child) {
                            let _childTask = gantt.getTask(_child)
                              if (new Date(_childTask.start_date) < dNewStartDate) {
                                dNewStartDate = new Date(_childTask.start_date);

                              }
                              if (new Date(_childTask.end_date) > dNewEndDate) {
                                dNewEndDate = new Date(_childTask.end_date);

                              }

                          });

                          if (task.dds_act_supplier === "") {
                            var vSplitHours = Ext.getStore('gantt.taskdatesimpact').getById(task.id).get("hours")

                              Ext.getStore('gantt.taskdatesimpact').getById(task.id).get("dates").forEach(function (_Date) {
                                dInitDate = Ext.Date.format(new Date(_Date), 'm/d/Y');
                                vOldIndex = vData.findIndex(item => item.supplier_code === task.dds_act_mrc && item.date === dInitDate && item.trade == '*');
                                var vNewValue = 0
                                  if (vData[vOldIndex]) {
                                    vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vSplitHours))
                                      vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                  }
                              });

                            var dDateTemp = new Date(Ext.Date.format(task.start_date, 'm/d/Y')),
                            dDateTemp2 = new Date(Ext.Date.format(task.end_date, 'm/d/Y')),
                            dListofDates = [],
                            nOccurr = Ext.Date.diffDays(dDateTemp, dDateTemp2) + 1;
                            vSplitHours = parseFloat((parseFloat(task.dds_act_est) / nOccurr).toFixed(1));

                            while (dDateTemp <= dDateTemp2) {
                              dInitDate = Ext.Date.format(dDateTemp, 'm/d/Y');
                              vNewIndex = vData.findIndex(item => item.supplier_code === task.dds_act_mrc && item.date === dInitDate && item.trade == '*');
                              var vNewValue = 0
                                if (vData[vNewIndex]) {
                                  vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vSplitHours))
                                    vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                }
                                dTemp = new Date(dDateTemp);
                              dListofDates.push(dTemp);
                              dDateTemp.setDate(dDateTemp.getDate() + 1);
                            }
                            Ext.getStore('gantt.taskdatesimpact').getById(task.id).set("dates", dListofDates);
                            Ext.getStore('gantt.taskdatesimpact').getById(task.id).set("hours", vSplitHours);

                          } else {
                            var vSplitHours = Ext.getStore('gantt.taskdatesimpact').getById(task.id).get("hours")

                              Ext.getStore('gantt.taskdatesimpact').getById(task.id).get("dates").forEach(function (_Date) {
                                dInitDate = Ext.Date.format(new Date(_Date), 'm/d/Y');
                                vOldIndex = vData.findIndex(item => item.supplier_code === task.dds_act_supplier && item.date === dInitDate && item.trade == '*');
                                var vNewValue = 0
                                  if (vData[vOldIndex]) {
                                    vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vSplitHours))
                                      vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                  }
                              });

                            var dDateTemp = new Date(Ext.Date.format(task.start_date, 'm/d/Y')),
                            dDateTemp2 = new Date(Ext.Date.format(task.end_date, 'm/d/Y')),
                            dListofDates = [],
                            nOccurr = Ext.Date.diffDays(dDateTemp, dDateTemp2) + 1;
                            vSplitHours = parseFloat((parseFloat(task.dds_act_est) / nOccurr).toFixed(1));

                            while (dDateTemp <= dDateTemp2) {
                              dInitDate = Ext.Date.format(dDateTemp, 'm/d/Y');
                              vNewIndex = vData.findIndex(item => item.supplier_code === task.dds_act_supplier && item.date === dInitDate && item.trade == '*');
                              var vNewValue = 0
                                if (vData[vNewIndex]) {
                                  vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vSplitHours))
                                    vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                }
                                dTemp = new Date(dDateTemp);
                              dListofDates.push(dTemp);
                              dDateTemp.setDate(dDateTemp.getDate() + 1);
                            }
                            Ext.getStore('gantt.taskdatesimpact').getById(task.id).set("dates", dListofDates);
                            Ext.getStore('gantt.taskdatesimpact').getById(task.id).set("hours", vSplitHours);

                          }
                          if (!actionUpdate) {
                            vParentTask.start_date = dNewStartDate;
                            vParentTask.end_date = dNewEndDate;
                            vParentTask.duration = gantt.calculateDuration(vParentTask.start_date, vParentTask.end_date);
                            addUndo('update', vParentTask.id, vParentTask, task.id, vUpdateID);
                            vParentTask.updated = 0;
                            vParentTask.prev_start = vParentTask.start_date
                              vParentTask.prev_end = vParentTask.end_date;
                          }

                        }
                        gantt.getTask(task.id).updated = 0;
                        gantt.getTask(task.id).prev_start = task.start_date;
                        gantt.getTask(task.id).prev_end = task.end_date;
                        gantt.refreshData();

                      }
                    }
                  }

                });

                gantt.attachEvent("onTaskDblClick", function (vTaskId, e) {
                  ////console.log("dblclick")
                  /*var task = gantt.getTask(vTaskId);
                  if ((!task["render"] || task["render"] == "") && task.type == "Project") {
                  task.render = "split";
                  } else {
                  task.render = "";
                  task.$open = true;
                  }
                  gantt.render();*/
                });
                gantt.attachEvent("onDragEnd", function (id, mode, task, original) {
                  var modes = gantt.config.drag_mode;
                  //////console.log("onDragEnd2");

                  return true;
                });

                gantt.attachEvent("onAfterBatchUpdate", function () {
                  console.log("onAfterBatchUpdate");
                });
                gantt.attachEvent("onTaskDrag", function (id, mode, task, original) {
                  console.log("onTaskDrag", task.id);
                });

                gantt.attachEvent("onTaskOpened", function (id) {
                  //gantt.sort('start_date',false, id);
                  var vElementid = "";
                  var vDate = "";
                  var vHours = "";

                });
                gantt.attachEvent("onContextMenu", function (vTaskId, e, el, d, f, g) {

                  function getElementPosition(elem) {
                    var rect = elem.getBoundingClientRect();
                    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    return {
                      top: rect.top + scrollTop,
                      left: rect.left + scrollLeft
                    };
                  }

                  var ganttPos = getElementPosition(gantt.$task);
                  var scrollLeft = gantt.$task.scrollLeft;
                  var relativeX = el.clientX - ganttPos.left + gantt.$task.scrollLeft;
                  var dDateToSched = new Date(gantt.dateFromPos(relativeX));
                  //dDateToSched.setDate(dDateToSched.getDate()-3);
                  if (el.target.getAttribute("class") == "resource_avl_day") {
                    var vItems = []
                    var vSupp = el.target.getAttribute("supplier"),
                    vSuppOrg = el.target.getAttribute("supplierorg"),
                    vSuppDesc = el.target.getAttribute("supplierdesc"),
                    vTrade = el.target.getAttribute("trade"),
                    vTradedesc = el.target.getAttribute("tradedesc"),
                    vType = el.target.getAttribute("type"),
                    vDate = el.target.getAttribute("date")
                      if (Ext.getCmp('menuContext_Gantt')) {
                        ////console.log('menuContext_Gantt');
                        try {
                          Ext.getCmp('menuContext_Gantt').destroy();
                        } catch (err) {}
                      }
                      if (vType === 'MRC') {
                        vItems = [{
                            id: "Adjust Department capacity",
                            text: vBoilerList["menu_adjustdepcapacity"]//'Split'
                          }, {
                            id: "View Deparment planning",
                            text: vBoilerList["menu_detaildepday"]//'Split'
                          }
                        ]
                        var menuContext = new Ext.menu.Menu({
                          id: "menuContext_Gantt",
                          items: vItems,
                          listeners: {
                            click: function (item, b, c, d, e) {
                              if (b.id == "Adjust Department capacity") {
                                gantt.config.capacity_mode = "display";
                                adjust_department_capacity(vSupp, vSuppOrg, vSuppDesc, vTrade, vTradedesc, vBoilerList)
                              }
                              if (b.id == "View Deparment planning") {
                                view_detail_department_trade(vSupp, vSuppOrg, vTrade, vDate)
                              }
                            }
                          }
                        });
                      } else {
                        vItems = [{
                            id: "Adjust capacity",
                            text: vBoilerList["menu_adjustcapacity"]//'Split'
                          }, {
                            id: "View detail planning",
                            text: vBoilerList["menu_detailsupplierday"]//'Split'
                          }
                        ]

                        var menuContext = new Ext.menu.Menu({
                          id: "menuContext_Gantt",
                          items: vItems,
                          listeners: {
                            click: function (item, b, c, d, e) {
                              if (b.id == "Adjust capacity") {
                                gantt.config.capacity_mode = "display";
                                adjust_supplier_capacity(vSupp, vSuppOrg, vSuppDesc, vTrade, vTradedesc, vBoilerList)
                              }
                              if (b.id == "View detail planning") {
                                view_detail_supplier_trade(vSupp, vSuppOrg, vTrade, vDate)
                              }
                            }
                          }
                        });
                      }

                      var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                    y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

                    menuContext.showAt(x, y);
                  } else {
                    var vItems = []
                    if (vTaskId) {
                      //var target = e.target || e.srcElement;
                      if (vTaskId.indexOf("(") > 10000) {
                        return false;
                      } else {
                        var panel;

                        if (Ext.isEmpty(vTaskId)) {
                          return false;
                        }
                        //  dDateToSched = new Date(gantt.getTask(vTaskId).start_date)

                        if (Ext.getCmp('menuContext_Gantt')) {
                          ////console.log('menuContext_Gantt');
                          try {
                            Ext.getCmp('menuContext_Gantt').destroy();
                          } catch (err) {}

                        }

                        let vList = EAM.Ajax.request({
                          url: "GRIDDATA",
                          params: {
                            SYSTEM_FUNCTION_NAME: "XUCKIP",
                            USER_FUNCTION_NAME: "XUCKIP",
                            MADDON_FILTER_ALIAS_NAME_1: "ins_code",
                            MADDON_FILTER_OPERATOR_1: "=",
                            MADDON_FILTER_JOINER_1: "AND",
                            MADDON_FILTER_SEQNUM_1: "1",
                            MADDON_FILTER_VALUE_1: 'SHUT_UPW'
                          }
                        }).responseData;
                        let _showUpdWo = false;
                        if (EAM.Utils.propertyExists(vList, 'pageData.grid.GRIDRESULT.GRID.DATA')) {
                          if (vList.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {
                            if (vList.pageData.grid.GRIDRESULT.GRID.DATA[0].ins_desc == "ON") {
                              _showUpdWo = true;
                            }
                          }
                        }

                        //Siva added  funtionality to split
                        if (gantt.getTask(vTaskId).type == "Project") {
                          if (_showUpdWo) {
                            vItems = [{
                                id: "View projectCode Details",
                                text: vBoilerList["menu_go_to_wo"]//'Split'
                              }, {
                                id: "Update projectCode",
                                text: vBoilerList["menu_update_wo"]//'Split'
                              }
                            ]
                          } else {
                            vItems = [{
                                id: "View projectCode Details",
                                text: vBoilerList["menu_go_to_wo"]//'Split'
                              }
                            ]
                          }
                        }
						var vReadOnly = false;
                        if (gantt.getTask(vTaskId).type == "Activity" && (gantt.getTask(vTaskId)["render"] != "split" || !gantt.getTask(vTaskId)["render"]) && (vTaskId.indexOf('#') > 0) && (gantt.getChildren(vTaskId).length == 0 || gantt.getChildren(vTaskId).length <= 0)) {
                          vItems = [
                            /*{
                            id: "Split Activity",
                            text: vBoilerList["menu_rendersplit"] //'Split'
                            },*/
                            {
                              id: "UpdateActivity_item",
                              text: vBoilerList["menu_updateactivity"]//'Update Activity'
                            }, {
                              id: "view_partavailability",
                              text: vBoilerList["menu_view_partavailability"]
                            }, {
                              id: "view_toolconflicts",
                              text: vBoilerList["menu_view_toolconflicts"]
                            }, {
                              id: "Schedule_activity",
                              text: 'Add schedule' //vBoilerList["menu_view_toolconflicts"]
                            }

                          ];
                          var vSplitItem = false;
                        }
                        if (gantt.getTask(vTaskId).type == "Activity" && (gantt.getTask(vTaskId)["render"] == "split") && (vTaskId.indexOf('#') > 0) && (gantt.getChildren(vTaskId).length > 0)) {
                          vItems = [
                            /*{
                            id: "Unsplit Activity",
                            text: vBoilerList["menu_renderunsplit"] //'Unsplit'
                            },*/
                            {
                              id: "UpdateActivity_item",
                              text: vBoilerList["menu_updateactivity"]//'Update Activity'
                            }, {
                              id: "Add_specific_date",
                              text: vBoilerList["menu_add_specific_date"]
                            }, {
                              id: "view_partavailability",
                              text: vBoilerList["menu_view_partavailability"]
                            }, {
                              id: "view_toolconflicts",
                              text: vBoilerList["menu_view_toolconflicts"]
                            }, {
                              id: "Schedule_activity",
                              text: 'Add schedule' //vBoilerList["menu_view_toolconflicts"]
                            }
                          ];
                          var vSplitItem = true;
						  
                        }
                        if (vItems.length > 0) {
                          var menuContext = new Ext.menu.Menu({
                            id: "menuContext_Gantt",
                            items: vItems,
                            listeners: {
                              click: function (item, b, c, d, e) {
                                // handle click
                                //  //console.log('click');
                                if (b.id == "Schedule_activity") {
                                  var vWo = vTaskId.split('#')[0],
                                  vAct = vTaskId.split('#')[1];
                                  schedule_employee(vWo, vAct, dDateToSched, gantt.getTask(vTaskId).organization);
                                }
                                if (b.id == "Update projectCode") {
                                  var dblClickedObject = gantt.getTask(vTaskId);

                                  /* if (Ext.isEmpty(dblClickedObject.wostatus))
                                  return true;*/

                                  var vProjectRecord = EAM.Ajax.request({
                                    url: "WSJOBS.HDR",
                                    params: {
                                      SYSTEM_FUNCTION_NAME: "WSJOBS",
                                      USER_FUNCTION_NAME: "WSJOBS",
                                      CURRENT_TAB_NAME: "HDR",
                                      CHECK_CF_CHANGEFLAG: true,
                                      projectcode: dblClickedObject.proj_code,
                                      organization: dblClickedObject.organization,
                                      pagemode: "view"
                                    }
                                  }).responseData.pageData.values;

                                  var comboStoreStatuses = Ext.create('Ext.data.Store', {
                                    data: vProjectRecord["projectCodestatus"].option,
                                    id: 'WOStatuses'
                                  });

                                  if (Ext.getCmp('wostatus_upd')) {
                                    //console.log('destroy_wostatus_upd');
                                    try {
                                      Ext.getCmp('wostatus_upd').destroy();
                                    } catch (err) {}

                                  }
                                  if (Ext.getCmp('woupd_assignto')) {
                                    //console.log('destroy_wostatus_upd');
                                    try {
                                      Ext.getCmp('woupd_assignto').destroy();
                                    } catch (err) {}

                                  }

                                  if (Ext.getCmp('StartDate_upd')) {
                                    //console.log('destroy_StartDate_upd');
                                    try {
                                      Ext.getCmp('StartDate_upd').destroy();
                                    } catch (err) {}

                                  }

                                  if (Ext.getCmp('EndDate_upd')) {
                                    //console.log('destroy_EndDate_upd');
                                    try {
                                      Ext.getCmp('EndDate_upd').destroy();
                                    } catch (err) {}

                                  }

                                  if (Ext.getCmp('CompletedDate_upd')) {
                                    //console.log('destroy_CompletedDate_upd');
                                    try {
                                      Ext.getCmp('CompletedDate_upd').destroy();
                                    } catch (err) {}

                                  }

                                  if (Ext.getCmp('WoUpdatePanel1')) {
                                    //console.log('destroy_WoUpdatePanel1');
                                    try {
                                      Ext.getCmp('WoUpdatePanel1').destroy();
                                    } catch (err) {}

                                  }

                                  if (panel == null) {
                                    panel = new Ext.Panel({
                                      title: vBoilerList["woupdatetitle"] + " " + dblClickedObject.id,
                                      frame: true,
                                      width: 480,
                                      id: 'WoUpdatePanel1',
                                      height: 400,
                                      modal: true,
                                      closable: true,
                                      centered: true,
                                      floating: true,
                                      layout: 'vbox',
                                      draggable: true,
                                      margins: '5 5 5 5',
                                      layoutConfig: {
                                        animate: true
                                      },

                                      items: [{
                                          xtype: 'combobox',
                                          store: Ext.getStore('WOStatuses'),
                                          fieldLabel: vBoilerList["woupdate_wo_status"],
                                          queryMode: 'local',
                                          displayField: 'display',
                                          valueField: 'value',
                                          value: vProjectRecord["projectCodestatus"].selected,
                                          id: "wostatus_upd",
                                          padding: "10px",
                                          readOnly: WOFieldsAttributes.projectCodestatus == "protected" ? true : false,
                                          currentAttribute: WOFieldsAttributes.projectCodestatus,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }, {
                                          xtype: 'uxdate',
                                          anchor: '100%',
                                          fieldLabel: vBoilerList["woupdate_start_date"],
                                          //fieldLabel: 'From',
                                          id: 'StartDate_upd',
                                          value: new Date(vProjectRecord.schedstartdate),
                                          //format: "d/m/y",
                                          padding: "10px",
                                          readOnly: WOFieldsAttributes.schedstartdate == "protected" ? true : false,
                                          currentAttribute: WOFieldsAttributes.schedstartdate,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }, {
                                          xtype: 'uxdate',
                                          anchor: '100%',
                                          fieldLabel: vBoilerList["woupdate_end_date"],
                                          //fieldLabel: 'From',
                                          id: 'EndDate_upd',
                                          value: new Date(vProjectRecord.schedenddate),
                                          //format: "d/m/y",
                                          padding: "10px",
                                          readOnly: WOFieldsAttributes.schedenddate == "protected" ? true : false,
                                          currentAttribute: WOFieldsAttributes.schedenddate,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }, {
                                          xtype: 'uxdate',
                                          anchor: '100%',
                                          fieldLabel: vBoilerList["woupdate_completed_date"],
                                          //fieldLabel: 'From',
                                          id: 'CompletedDate_upd',
                                          //format: "d/m/y",
                                          padding: "10px",
                                          readOnly: WOFieldsAttributes.datecompleted == "protected" ? true : false,
                                          currentAttribute: WOFieldsAttributes.datecompleted,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }, {
                                          name: 'woupd_assignto',
                                          id: "woupd_assignto",
                                          xtype: 'lovfield',
                                          colspan: 1,
                                          rowspan: 1,
                                          fieldLabel: vBoilerList["woupdate_assign_to"],
                                          maxLength: 15,
                                          value: vProjectRecord.projmanager,
                                          upper: !0,
                                          padding: "10px",
                                          readOnly: WOFieldsAttributes.projmanager == "protected" ? true : false,
                                          currentAttribute: WOFieldsAttributes.projmanager,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }
                                      ],
                                      buttons: [{
                                          text: vBoilerList["icon_close"],
                                          margin: '0 0 0 5',
                                          handler: function () {
                                            panel.close();
                                          }
                                        }, {
                                          text: vBoilerList["icon_save"],
                                          margin: '0 0 0 5',
                                          handler: function () {

                                            var vProjectRecordUpd = EAM.Ajax.request({
                                              url: "WSJOBS.HDR",
                                              params: {
                                                SYSTEM_FUNCTION_NAME: "WSJOBS",
                                                USER_FUNCTION_NAME: "WSJOBS",
                                                CURRENT_TAB_NAME: "HDR",
                                                CHECK_CF_CHANGEFLAG: true,
                                                projectcode: dblClickedObject.proj_code,
                                                organization: dblClickedObject.organization,
                                                pagemode: "view"
                                              }
                                            }).responseData.pageData.values;
                                            for (var k in vProjectRecordUpd) {
                                              if (Ext.isObject(vProjectRecordUpd[k])) {
                                                vProjectRecordUpd[k] = vProjectRecordUpd[k].selected
                                              }
                                            }
                                            var dD = new Date(Ext.getCmp('StartDate_upd').rawDate);
                                            var dF = new Date(Ext.getCmp('EndDate_upd').rawDate);

                                            gantt.getTask(dblClickedObject.id).start_date = new Date(Ext.getCmp('StartDate_upd').rawDate);
                                            gantt.getTask(dblClickedObject.id).end_date = new Date(dF.getFullYear(), dF.getMonth(), dF.getDate(), '23', '59', '00');

                                            if (!Ext.isEmpty(Ext.getCmp('StartDate_upd').value)) {
                                              vProjectRecordUpd.schedstartdate = formatDate(Ext.getCmp('StartDate_upd').rawDate);
                                            } else {
                                              vProjectRecordUpd.schedstartdate = "";
                                            }
                                            if (!Ext.isEmpty(Ext.getCmp('EndDate_upd').value)) {
                                              vProjectRecordUpd.schedenddate = formatDate(Ext.getCmp('EndDate_upd').rawDate);
                                            } else {
                                              vProjectRecordUpd.schedenddate = "";
                                            }
                                            if (!Ext.isEmpty(Ext.getCmp('CompletedDate_upd').value)) {
                                              vProjectRecordUpd.datecompleted = formatDate(Ext.getCmp('CompletedDate_upd').rawDate);
                                            } else {
                                              vProjectRecordUpd.datecompleted = "";
                                            }

                                            vProjectRecordUpd.projectCodestatus = Ext.getCmp('wostatus_upd').value;

                                            var dStart = new Date(EAM.utils.Date.parseDate(vProjectRecordUpd.actstartdate));
                                            dStart.setDate(dStart.getDate() + EAM.utils.Date.diffDays(EAM.utils.Date.parseDate(vProjectRecordUpd.actstartdate), EAM.utils.Date.parseDate(vProjectRecordUpd.schedstartdate)));

                                            var dEnd = new Date(EAM.utils.Date.parseDate(vProjectRecordUpd.actenddate));
                                            dEnd.setDate(dEnd.getDate() + EAM.utils.Date.diffDays(EAM.utils.Date.parseDate(vProjectRecordUpd.actenddate), EAM.utils.Date.parseDate(vProjectRecordUpd.schedenddate)));

                                            vProjectRecordUpd.actstartdate = formatDate(new Date(dStart.getFullYear(), dStart.getMonth(), dStart.getDate(), '00', '00'));
                                            vProjectRecordUpd.actenddate = formatDate(new Date(dEnd.getFullYear(), dEnd.getMonth(), dEnd.getDate(), '00', '00'));
                                            vProjectRecordUpd.projmanager = Ext.getCmp('woupd_assignto').value;

                                            var vStatusWOUpd = EAM.Ajax.request({
                                              url: "WSJOBS.HDR?pageaction=SAVE",
                                              params: Ext.merge(vProjectRecordUpd, {
                                                SYSTEM_FUNCTION_NAME: "WSJOBS",
                                                USER_FUNCTION_NAME: "WSJOBS",
                                                CURRENT_TAB_NAME: "HDR",
                                                CHECK_CF_CHANGEFLAG: true,
                                                can_update: true,
                                                pagemode: "view"
                                              })
                                            });
                                            if (vStatusWOUpd.success) {
                                              var vMsg = vBoilerList["woupdate_success_message"];
                                              var find = ':param1';
                                              var re = new RegExp(find, 'g');
                                              vMsg = vMsg.replace(re, "1");
                                              find = ':param2';
                                              re = new RegExp(find, 'g');
                                              vMsg = vMsg.replace(re, '1 (' + dblClickedObject.wo + ')');
                                              //parent.EAM.Messaging.showConfirmation(vCounter + " of " + vTotalCounter + " projectCode(s) updated successfully.");

                                              EAM.Messaging.showConfirmation(vMsg);

                                              panel.close();

                                              gantt.refreshTask(dblClickedObject.id, true);
                                            }

                                          }

                                        }
                                      ]
                                    });

                                    Ext.getCmp('StartDate_upd').addListener('change', function () {
                                      var vNewSartDate = Ext.getCmp('StartDate_upd').rawDate;
                                      var vNewEndDate = Ext.getCmp('EndDate_upd').rawDate;

                                      if (vNewEndDate != "" && vNewSartDate != "") {
                                        var dNewStartDate = new Date(vNewSartDate);
                                        var dNewEndDate = new Date(vNewEndDate);

                                        if (dNewEndDate < dNewStartDate) {
                                          Ext.getCmp('EndDate_upd').setValue(dNewStartDate);
                                        }

                                      }
                                    })

                                    Ext.getCmp('EndDate_upd').addListener('change', function () {
                                      var vNewSartDate = Ext.getCmp('StartDate_upd').rawDate;
                                      var vNewEndDate = Ext.getCmp('EndDate_upd').rawDate;

                                      if (vNewEndDate != "" && vNewSartDate != "") {
                                        var dNewStartDate = new Date(vNewSartDate);
                                        var dNewEndDate = new Date(vNewEndDate);

                                        if (dNewEndDate < dNewStartDate) {
                                          Ext.getCmp('StartDate_upd').setValue(dNewEndDate);
                                        }

                                      }
                                    })

                                    var vFormPanel = EAM.Utils.getScreen().getCurrentTab().getFormPanel();
                                    vFormPanel.getRecord().set("woupd_assignto", "")
                                    var vUserField = Ext.getCmp("woupd_assignto");
                                    vUserField.formPanel = vFormPanel;
                                    vUserField.lookupLOV = {
                                      lovName: 'LVPERS',
                                      inputVars: {
                                        'control.org': dblClickedObject.organization
                                      },
                                      returnFields: {
                                        'woupd_assignto': 'personcode'
                                      }
                                    };

                                    vUserField.validateLOV = {
                                      lovName: 'LVPERS',
                                      inputVars: {
                                        'control.org': dblClickedObject.organization
                                      },
                                      returnFields: {
                                        'woupd_assignto': 'personcode'
                                      }
                                    };
                                    panel.show();
                                  }
                                }
                                if (b.id == "View projectCode Details") {
                                  EAM.ContextManager.getEAM("parent").Usage.start("screen_hyperlink");
                                  var WO = gantt.getTask(vTaskId)
                                    var vWODDsJobType = 2005 //gantt.custom_settings.wo_wsjobs_ddspyid[WO.dds_evt_jobtype]
                                    var vWOScreenJobType = gantt.custom_settings.wo_wsjobs_screen_hpl[WO.dds_evt_jobtype] || "WSJOBS"
                                    a = ["hyperlink", 1, "Q:WEBL", "COMPONENT_INFO_TYPE=HEAD_DATA&DATASPY_ID=" + vWODDsJobType + "&MADDON_FILTER_ALIAS_NAME_1=projectcode&MADDON_FILTER_OPERATOR_1=" + encodeURIComponent("=") + "&MADDON_FILTER_JOINER_1=AND&MADDON_FILTER_SEQNUM_1=1&MADDON_FILTER_VALUE_1=" + encodeURIComponent(gantt.getTask(vTaskId).proj_code) + "&ADDONS_REQUIRED=true&", "projectcode"];
                                  var b = EAM.Utils.createModal({
                                    header: false,
                                    cust_object: 'shutdown_planning',
                                    parentContext: window
                                  });
                                  b.show();
                                  b.update("loadmain?initpath=WSJOBS&SYSTEM_FUNCTION_NAME=WSJOBS&USER_FUNCTION_NAME=WSJOBS&MENU_MODULE_KEY=-1&fromlogin=yes&popup=TRUE&skipfirstfunccheck=true&CURRENT_TAB_NAME=LST&hyperlinksource=F&uitheme=ux3", a)

                                }

                                if (b.id == "view_toolconflicts") {
                                  var WO = gantt.getTask(vTaskId);
                                  var vParams = {
                                    'USER_FUNCTION_NAME': "BSALPG",
                                    'gridname': "XUDSTO",
                                    'LOV_ALIAS_NAME_1': 'event',
                                    'LOV_ALIAS_VALUE_1': WO.id.split('#')[0],
                                    'LOV_ALIAS_TYPE_1': 'text',
                                    'LOV_ALIAS_NAME_2': 'activity',
                                    'LOV_ALIAS_VALUE_2': WO.id.split('#')[1],
                                    'LOV_ALIAS_TYPE_2': 'text'
                                  };

                                  Ext.create('EAM.view.common.popups.Grid', {
                                    width: 1000,
                                    height: 600,
                                    id: 'custom_viewgrid',
                                    resizable: !0,
                                    displayDataspy: !0,
                                    cust_object: 'shutdown_planning',
                                    url: 'BSALPG',
                                    itemId: 'BSALPG',
                                    popCaption: "",
                                    popTitle: "",
                                    screen: EAM.Utils.getScreen(),
                                    callingPanel: EAM.Utils.getScreen().getCurrentTab().getFormPanel(),
                                    params: vParams,
                                    dialogButtons: ['close'],
                                    closable: !1
                                  }).show()
                                }

                                if (b.id == "view_partavailability") {
                                  var WO = gantt.getTask(vTaskId);
                                  var d = {
                                    'organization': WO.dds_evt_org,
                                    'activity': WO.id.split('#')[1],
                                    'projectcode': WO.id.split('#')[0],
                                    'department': WO.dds_evt_mrc,
                                    'filterfields': "activity",
                                    'filteroperator': "=",
                                    'filtervalue': WO.id.split('#')[1]
                                  };
                                  var a = 'WSPLPA';
                                  Ext.create('EAM.view.common.popups.Grid', {
                                    url: a,
                                    itemId: a,
                                    width: 900,
                                    height: 510,
                                    cust_object: 'shutdown_planning',
                                    resizable: !0,
                                    displayDataspy: !0,
                                    hideExcelButton: !0,
                                    //screen: this.getScreen(),
                                    //callingPanel: this.getFormPanel(),
                                    dialogButtons: ['close'],
                                    params: d
                                  }).show()
                                }
                                if (b.id == "Add_specific_date") {
                                  var dblClickedObject = gantt.getTask(vTaskId);
                                  var sDateSpeStore = Ext.getStore('gantt.datespetype.store')

                                    var actTask = gantt.getTask(vTaskId);

                                  if (Ext.getCmp('datespe_type')) {
                                    ////console.log('destroy_CompletedDate_upd');
                                    try {
                                      Ext.getCmp('datespe_type').destroy();
                                    } catch (err) {}

                                  }

                                  if (panel == null) {
                                    panel = new Ext.Panel({
                                      title: "Ajoute date spÃ©cifique", //vBoilerList["activityupdatetitle"] + " " + actTask.parent,
                                      frame: true,
                                      width: 490,
                                      id: 'DateSpeAddPanel',
                                      height: 300,
                                      modal: true,
                                      closable: true,
                                      centered: true,
                                      floating: true,
                                      layout: 'vbox',
                                      draggable: true,
                                      margins: '5 5 5 5',
                                      layoutConfig: {
                                        animate: true
                                      },

                                      items: [{
                                          xtype: 'combobox',
                                          store: sDateSpeStore,
                                          queryMode: 'local',
                                          displayField: 'description',
                                          fieldLabel: vBoilerList["datespe_type_lb"],
                                          valueField: 'code',
                                          value: "JALON",
                                          id: "datespe_type",
                                          padding: "10px",
                                          allowBlank: false,
                                          readOnly: !0,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          listeners: {
                                            change: function () {}
                                          }
                                        }, {
                                          xtype: 'textfield',
                                          fieldLabel: vBoilerList["datespe_desc_lb"],
                                          id: 'datespe_desc',
                                          value: "",
                                          allowBlank: false,
                                          currentAttribute: "required",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                                          size: "50",
                                          maxLength: "255",
                                          padding: "10px"
                                        }, {
                                          xtype: 'uxdatetime',
                                          anchor: '100%',
                                          fieldLabel: vBoilerList["datespe_date_lb"],
                                          //fieldLabel: 'From',
                                          id: 'datespe_date',
                                          value: new Date(gantt.getTask(vTaskId).start_date),
                                          //format: "d/m/y",																		,
                                          allowBlank: false,
                                          currentAttribute: "required",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                                          padding: "10px"
                                        }
                                      ],
                                      buttons: [{
                                          text: vBoilerList["icon_close"],
                                          margin: '0 0 0 5',
                                          handler: function () {
                                            panel.close();
                                          }
                                        }, {
                                          text: vBoilerList["icon_save"],
                                          margin: '0 0 0 5',
                                          handler: function () {
                                            if (Ext.isEmpty(Ext.getCmp('datespe_desc').value) || Ext.isEmpty(Ext.getCmp('datespe_type').value) || Ext.isEmpty(Ext.getCmp('datespe_date').value)) {

                                              if (Ext.isEmpty(Ext.getCmp('datespe_desc').value)) {
                                                Ext.getCmp('datespe_desc').markInvalid(EAM.Lang.getMessage('MSG_ERR_FIELD_REQUIRED'));
                                              }
                                              if (Ext.isEmpty(Ext.getCmp('datespe_date').value)) {
                                                Ext.getCmp('datespe_date').markInvalid(EAM.Lang.getMessage('MSG_ERR_FIELD_REQUIRED'));
                                              }
                                              if (Ext.isEmpty(Ext.getCmp('datespe_type').value)) {
                                                Ext.getCmp('datespe_type').markInvalid(EAM.Lang.getMessage('MSG_ERR_FIELD_REQUIRED'));
                                              }
                                              EAM.Messaging.showError(EAM.Lang.getMessage('MSG_ERR_PAGE_REQUIRED'))

                                            } else {
                                              var vListOfDateforWOAct = EAM.Ajax.request({
                                                url: "BSUDSC.xmlhttp",
                                                params: {
                                                  GRID_NAME: "XUDASP",
                                                  MADDON_FILTER_ALIAS_NAME_1: "wspf_10_wo",
                                                  MADDON_FILTER_OPERATOR_1: "=",
                                                  MADDON_FILTER_JOINER_1: "AND",
                                                  MADDON_FILTER_SEQNUM_1: "1",
                                                  MADDON_FILTER_VALUE_1: vTaskId.split('#')[0],
                                                  MADDON_LPAREN_1: false,
                                                  MADDON_RPAREN_1: false,
                                                  MADDON_FILTER_ALIAS_NAME_2: "wspf_10_wo_act",
                                                  MADDON_FILTER_OPERATOR_2: "=",
                                                  MADDON_FILTER_JOINER_2: "AND",
                                                  MADDON_FILTER_SEQNUM_2: "2",
                                                  MADDON_FILTER_VALUE_2: vTaskId.split('#')[1],
                                                  MADDON_LPAREN_2: false,
                                                  MADDON_RPAREN_2: false,
                                                  USER_FUNCTION_NAME: "XUDASP",
                                                  SYSTEM_FUNCTION_NAME: "BSUDSC",
                                                  CURRENT_TAB_NAME: "LST",
                                                  COMPONENT_INFO_TYPE: "DATA_ONLY"
                                                }
                                              }).responseData;
                                              var vNewLigne = 1;
                                              var vMaxLine = 0;

                                              if (vListOfDateforWOAct.pageData)
                                                if (vListOfDateforWOAct.pageData.grid)
                                                  if (vListOfDateforWOAct.pageData.grid.GRIDRESULT)
                                                    if (vListOfDateforWOAct.pageData.grid.GRIDRESULT.GRID)
                                                      if (vListOfDateforWOAct.pageData.grid.GRIDRESULT.GRID.DATA) {
                                                        if (vListOfDateforWOAct.pageData.grid.GRIDRESULT.GRID.DATA.length > 0) {

                                                          var vListTemp = vListOfDateforWOAct.pageData.grid.GRIDRESULT.GRID.DATA;
                                                          for (i = 0; i < vListTemp.length; i++) {
                                                            if (vMaxLine < parseInt(vListTemp[i].wspf_10_line)) {
                                                              vMaxLine = parseInt(vListTemp[i].wspf_10_line)
                                                            }
                                                          }
                                                          vNewLigne = vMaxLine + 1
                                                        }
                                                      }

                                              var vLoad = EAM.Ajax.request({
                                                url: "BSUDSC?USER_FUNCTION_NAME=XUDASP&FUNCTION_CLASS=WEBD",
                                                params: {
                                                  SYSTEM_FUNCTION_NAME: "BSUDSC",
                                                  USER_FUNCTION_NAME: "XUDASP",
                                                  CURRENT_TAB_NAME: null,
                                                  FUNCTION_CLASS: "WEBD",
                                                  removescreenflows: "yes",
                                                  MENU_MODULE_KEY: 0
                                                }
                                              });

                                              var vNewRecord = EAM.Ajax.request({
                                                url: "BSUDSC.HDR",
                                                params: {
                                                  SYSTEM_FUNCTION_NAME: "BSUDSC",
                                                  USER_FUNCTION_NAME: "XUDASP",
                                                  CURRENT_TAB_NAME: "HDR",
                                                  wspf_10_wo: '*',
                                                  wspf_10_wo_act: 1,
                                                  wspf_10_line: 1,
                                                  ONLY_DATA_REQUIRED: true,
                                                  SCROLLROW: 'YES'
                                                }
                                              }).responseData.pageData.values;
                                              var dNewDate = new Date(Ext.getCmp('datespe_date').rawDate);

                                              vNewRecord["processaction"] = "insert";
                                              vNewRecord["pagemode"] = "display";
                                              vNewRecord["cfgrouplist"] = null
                                                vNewRecord["pagemode"] = "display"
                                                vNewRecord["processaction"] = "insert"
                                                vNewRecord["webservicepromptcode"] = "XUDASP"
                                                vNewRecord["wspf_10_date_desc"] = Ext.getCmp('datespe_desc').value
                                                vNewRecord["wspf_10_date_line"] = Ext.Date.format(dNewDate, 'm/d/Y H:i')
                                                vNewRecord["wspf_10_type_date"] = Ext.getCmp('datespe_type').value
                                                vNewRecord["wspf_10_wo"] = vTaskId.split('#')[0]
                                                vNewRecord["wspf_10_wo_act"] = vTaskId.split('#')[1]
                                                vNewRecord["wspf_10_line"] = vNewLigne

                                                var vStatus = EAM.Ajax.request({
                                                  url: "BSUDSC.HDR.insertrecord?pageaction=SAVE",
                                                  params: Ext.merge(vNewRecord, {
                                                    CHECK_CF_CHANGEFLAG: "true",
                                                    CURRENT_TAB_NAME: "HDR",
                                                    SYSTEM_FUNCTION_NAME: "BSUDSC",
                                                    USER_FUNCTION_NAME: "XUDASP",
                                                    can_update: "true",

                                                  })
                                                });
                                              if (vStatus.success) {
                                                var vId = vTaskId.split('#')[0] + '#' + vTaskId.split('#')[1] + '#0'
                                                  if (DateSpeMap.has(vId)) {
                                                    var map = DateSpeMap.get(vId);
                                                    var mapdetails = {
                                                      start_date: Ext.Date.format(dNewDate, 'm/d/Y H:i'),
                                                      desc: Ext.getCmp('datespe_desc').value,
                                                      type: Ext.getCmp('datespe_type').value
                                                    };
                                                    map.set(vNewLigne.toString(), mapdetails);
                                                    DateSpeMap.set(vId, map);
                                                  } else {
                                                    var map = new Map();
                                                    var mapdetails = {
                                                      start_date: Ext.Date.format(dNewDate, 'm/d/Y H:i'),
                                                      desc: Ext.getCmp('datespe_desc').value,
                                                      type: Ext.getCmp('datespe_type').value
                                                    };
                                                    map.set(vNewLigne.toString(), mapdetails);
                                                    DateSpeMap.set(vId, map);
                                                  }
                                                  gantt.refreshTask(vId);
                                                panel.close();
                                              }

                                            }
                                          }

                                        }
                                      ]
                                    });
                                    panel.show();
                                  }
                                  //gantt.refreshTask(vTaskId, true);
                                }
                                if (b.id == "UpdateActivity_item") {
                                  var dblClickedObject = gantt.getTask(vTaskId);

                                  var actTask = gantt.getTask(vTaskId);
                                  var vact = actTask.act_act;
                                  var indexact = actTask.id.indexOf('#');
                                  var projActivity = actTask.id.split("#")[1]; //actTask.id.substring(indexact+1,actTask.length);
                                  var vClassActHrs = (vSplitItem) ? "form-text-readonly" : "";

                                  var vRecordActivity = EAM.Ajax.request({
                                    url: "WSJOBS.ACT",
                                    params: {
                                      SYSTEM_FUNCTION_NAME: "WSJOBS",
                                      USER_FUNCTION_NAME: /* gantt.custom_settings.wo_wsjobs_screen[actTask.dds_evt_jobtype]||*/ "WSJOBS",
                                      CURRENT_TAB_NAME: "ACT",
                                      CHECK_CF_CHANGEFLAG: true,
                                      projectcode: actTask.id.split('#')[0],
                                      organization: actTask.organization,
                                      activity: projActivity,
                                      pagemode: "view"
                                    }
                                  }).responseData.pageData.values;

                                  if (Ext.getCmp('Act_Est_Hours_Field')) {
                                    ////////console.log('destroy_CompletedDate_upd');
                                    try {
                                      Ext.getCmp('Act_Est_Hours_Field').destroy();
                                    } catch (err) {}

                                  }

                                  if (Ext.getCmp('Act_Note_Field')) {
                                    ////////console.log('destroy_CompletedDate_upd');
                                    try {
                                      Ext.getCmp('Act_Note_Field').destroy();
                                    } catch (err) {}

                                  }
                                  if (Ext.getCmp('Act_udfchar01')) {
                                    ////////console.log('destroy_CompletedDate_upd');
                                    try {
                                      Ext.getCmp('Act_udfchar01').destroy();
                                    } catch (err) {}

                                  }

                                  if (Ext.getCmp('Act_NumberOfEmp_Field')) {
                                    ////////console.log('destroy_CompletedDate_upd');
                                    try {
                                      Ext.getCmp('Act_NumberOfEmp_Field').destroy();
                                    } catch (err) {}
                                  }

                                  if (Ext.getCmp('ActUpdatePanel1')) {
                                    ////////console.log('destroy_ActUpdatePanel1');
                                    try {
                                      Ext.getCmp('ActUpdatePanel1').destroy();
                                    } catch (err) {}

                                  }

                                  var vProjectRecordActUpd = EAM.Ajax.request({
                                    url: "WSJOBS.ACT",
                                    params: {
                                      SYSTEM_FUNCTION_NAME: "WSJOBS",
                                      USER_FUNCTION_NAME: /* gantt.custom_settings.wo_wsjobs_screen[actTask.dds_evt_jobtype]||*/ "WSJOBS",
                                      CURRENT_TAB_NAME: "ACT",
                                      CHECK_CF_CHANGEFLAG: true,
                                      projectcode: actTask.parent,
                                      organization: actTask.organization,
                                      activity: projActivity,
                                      pagemode: "view"
                                    }
                                  });
                                  var ActFieldsAttributes = {};

                                  if (vProjectRecordActUpd.success) {
                                    if (EAM.Utils.propertyExists(vProjectRecordActUpd, 'responseData.pageData.attributes')) {
                                      for (var key in vProjectRecordActUpd.responseData.pageData.attributes) {

                                        ActFieldsAttributes[key] = vProjectRecordActUpd.responseData.pageData.attributes[key]

                                      }
                                    }

                                  }

                                  var bActCompleted = false;

                                  if (vRecordActivity.completed == "-1") {
                                    bActCompleted = true;
                                  }

                                  if (panel == null) {
                                    panel = new Ext.Panel({
                                      title: vBoilerList["activityupdatetitle"] + " " + actTask.parent + "#" + projActivity,
                                      frame: true,
                                      width: 490,
                                      id: 'ActUpdatePanel1',
                                      height: 450,
                                      modal: true,
                                      closable: true,
                                      centered: true,
                                      floating: true,
                                      layout: 'vbox',
                                      draggable: true,
                                      margins: '5 5 5 5',
                                      layoutConfig: {
                                        animate: true
                                      },

                                      items: [{
                                          xtype: 'uxnumber',
                                          //queryMode: 'local',
                                          //displayField: 'esthrs',
                                          //valueField: 'value',
                                          fieldLabel: vBoilerList["woactesthrs"],
                                          id: 'Act_Est_Hours_Field',
                                          vtype: "currency",
                                          numberFormat: "24,6",
                                          value: EAM.utils.Format.number.toClientFormat(vRecordActivity.esthrs, 'number'),
                                          readOnly: ActFieldsAttributes.esthrs == "protected" ? true : false,
                                          currentAttribute: ActFieldsAttributes.esthrs,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field',
                                          padding: "10px"
                                        }, {
                                          xtype: 'uxnumber',
                                          //queryMode: 'local',
                                          //displayField: 'actemps',
                                          //valueField: 'value',
                                          fieldLabel: vBoilerList["woactnumofemps"],
                                          id: 'Act_NumberOfEmp_Field',
                                          vtype: "currency",
                                          numberFormat: "8,0",
                                          value: parseFloat(vRecordActivity.personsreq),
                                          padding: "10px",
                                          readOnly: ActFieldsAttributes.personsreq == "protected" ? true : false,
                                          currentAttribute: ActFieldsAttributes.personsreq,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }, {
                                          name: 'act_udfchar01',
                                          id: 'act_udfchar01',
                                          xtype: 'lovfield',
                                          fieldLabel: vBoilerList["woactdepartment"],
                                          maxLength: 15,
                                          upper: !0,
                                          lookupLOV: {
                                            lovName: 'LVMRCS',
                                            inputVars: {
                                              'control.org': actTask.organization
                                            },
                                            returnFields: {
                                              'act_udfchar01': 'department'
                                            }
                                          },
                                          validateLOV: {
                                            lovName: 'LVMRCS',
                                            inputVars: {
                                              'control.org': actTask.organization
                                            },
                                            returnFields: {
                                              'act_udfchar01': 'department'
                                            }
                                          },
                                          size: "30",
                                          value: vRecordActivity.udfchar01,
                                          maxLength: "30",
                                          padding: "10px",
                                          readOnly: ActFieldsAttributes.udfchar01 == "protected" ? true : false,
                                          currentAttribute: ActFieldsAttributes.udfchar01,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }, {
                                          xtype: 'textfield',
                                          //queryMode: 'local',
                                          //displayField: 'actnote',
                                          //valueField: 'value',
                                          fieldLabel: vBoilerList["woactnote"],
                                          id: 'Act_Note_Field',
                                          value: vRecordActivity.udfnote01,
                                          size: "50",
                                          maxLength: "256",
                                          padding: "10px",
                                          readOnly: ActFieldsAttributes.udfnote01 == "protected" ? true : false,
                                          currentAttribute: ActFieldsAttributes.udfnote01,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }, {
                                          xtype: 'uxnumber',
                                          fieldLabel: vBoilerList["woactperccplt"],
                                          id: 'Act_Percentcplt_Field',
                                          vtype: "currency",
                                          maskRe: "/[0-9]/",
                                          enforceMaxLength: true,
                                          maxLength: 3,
                                          maxValue: 100,
                                          numberFormat: "8,0",
                                          value: EAM.utils.Format.number.toClientFormat(vRecordActivity.percentcomplete, 'number'),
                                          padding: "10px",
                                          readOnly: ActFieldsAttributes.percentcomplete == "protected" ? true : false,
                                          currentAttribute: ActFieldsAttributes.percentcomplete,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'
                                        }, {
                                          xtype: 'checkbox',
                                          fieldLabel: vBoilerList["woactcomplete"],
                                          inputValue: '1',
                                          id: 'Act_Complete_Field',
                                          labelAlign: 'right',
                                          hidden: false,
                                          checked: bActCompleted,
                                          padding: "10px",
                                          listeners: {
                                            change: function () {
                                              if (Ext.getCmp("Act_Complete_Field").getValue()) {
                                                Ext.getCmp("Act_Percentcplt_Field").setValue("100");
                                              } else {
                                                Ext.getCmp("Act_Percentcplt_Field").setValue(null);
                                              }
                                            }
                                          },
                                          readOnly: ActFieldsAttributes.completed == "protected" ? true : false,
                                          currentAttribute: ActFieldsAttributes.completed,
                                          readOnlyCls: Ext.baseCSSPrefix + "form-text-readonly",
                                          requiredCls: Ext.baseCSSPrefix + 'form-required-field'

                                        }
                                      ],
                                      buttons: [{
                                          text: vBoilerList["icon_close"],
                                          margin: '0 0 0 5',
                                          handler: function () {
                                            panel.close();
                                          }
                                        }, {
                                          text: vBoilerList["icon_save"],
                                          margin: '0 0 0 5',
                                          handler: function () {
                                            EAM.Utils.mask(Ext.ComponentQuery.query('#custom_global_div')[0]);
                                            setTimeout(
                                              function () {

                                              var vProjectRecordActUpd = EAM.Ajax.request({
                                                url: "WSJOBS.ACT",
                                                params: {
                                                  SYSTEM_FUNCTION_NAME: "WSJOBS",
                                                  USER_FUNCTION_NAME: /* gantt.custom_settings.wo_wsjobs_screen[actTask.dds_evt_jobtype]||*/ "WSJOBS",
                                                  CURRENT_TAB_NAME: "ACT",
                                                  CHECK_CF_CHANGEFLAG: true,
                                                  projectcode: actTask.parent,
                                                  organization: actTask.organization,
                                                  activity: projActivity,
                                                  pagemode: "view"
                                                }
                                              }).responseData.pageData.values;
                                              for (var k in vProjectRecordActUpd) {
                                                if (Ext.isObject(vProjectRecordActUpd[k])) {
                                                  vProjectRecordActUpd[k] = vProjectRecordActUpd[k].selected
                                                }
                                              }

                                              if (!Ext.isEmpty(Ext.getCmp('Act_Est_Hours_Field').rawValue)) {
                                                vProjectRecordActUpd.esthrs = parseFloat(EAM.utils.Format.number.toStandardFormat(Ext.getCmp("Act_Est_Hours_Field").getValue(), "number"));
                                              } else if (Ext.isEmpty(Ext.getCmp('Act_Est_Hours_Field').rawValue)) {
                                                vProjectRecordActUpd.esthrs = "";
                                              } else {
                                                vProjectRecordActUpd.esthrs = parseFloat(EAM.utils.Format.number.toStandardFormat(Ext.getCmp("Act_Est_Hours_Field").getValue(), "number"));
                                              }
                                              if (!Ext.isEmpty(Ext.getCmp('Act_Note_Field').rawValue)) {
                                                vProjectRecordActUpd.udfnote01 = Ext.getCmp('Act_Note_Field').rawValue;
                                              } else if (Ext.isEmpty(Ext.getCmp('Act_Note_Field').rawValue)) {
                                                vProjectRecordActUpd.udfnote01 = "";
                                              } else {
                                                vProjectRecordActUpd.udfnote01 = Ext.getCmp('Act_Note_Field').initialValue;
                                              }
                                              if (!Ext.isEmpty(Ext.getCmp('Act_NumberOfEmp_Field').rawValue)) {
                                                vProjectRecordActUpd.personsreq = parseFloat(Ext.getCmp('Act_NumberOfEmp_Field').rawValue);
                                              } else if (Ext.isEmpty(Ext.getCmp('Act_NumberOfEmp_Field').rawValue)) {
                                                vProjectRecordActUpd.personsreq = "";
                                              } else {
                                                vProjectRecordActUpd.personsreq = parseFloat(Ext.getCmp('Act_NumberOfEmp_Field').initialValue);
                                              }

                                              if (!Ext.isEmpty(Ext.getCmp('Act_Percentcplt_Field').rawValue)) {
                                                vProjectRecordActUpd.percentcomplete = parseFloat(EAM.utils.Format.number.toStandardFormat(Ext.getCmp("Act_Percentcplt_Field").getValue(), "number"));
                                              } else if (Ext.isEmpty(Ext.getCmp('Act_Percentcplt_Field').rawValue)) {
                                                vProjectRecordActUpd.percentcomplete = "";
                                              } else {
                                                vProjectRecordActUpd.percentcomplete = parseFloat(EAM.utils.Format.number.toStandardFormat(Ext.getCmp("Act_Percentcplt_Field").getValue(), "number"));
                                              }

                                              vProjectRecordActUpd.udfchar01 = Ext.getCmp('act_udfchar01').getValue();

                                              if (Ext.getCmp("Act_Complete_Field").getValue()) {
                                                vProjectRecordActUpd.completed = '-1'
                                              } else {
                                                vProjectRecordActUpd.completed = '0'
                                              }

                                              var vStatusWOUpd = EAM.Ajax.request({
                                                url: "WSJOBS.ACT?pageaction=SAVE",
                                                params: Ext.merge(vProjectRecordActUpd, {
                                                  SYSTEM_FUNCTION_NAME: "WSJOBS",
                                                  USER_FUNCTION_NAME: /*gantt.custom_settings.wo_wsjobs_screen[actTask.dds_evt_jobtype]||*/ "WSJOBS",
                                                  CURRENT_TAB_NAME: "ACT",
                                                  CHECK_CF_CHANGEFLAG: true,
                                                  can_update: true,
                                                  pagemode: "view"
                                                })
                                              });
                                              if (vStatusWOUpd.success) {

                                                gantt.getTask(vTaskId).actest = parseFloat(EAM.utils.Format.number.toStandardFormat(Ext.getCmp("Act_Est_Hours_Field").getValue(), "number"));
                                                gantt.getTask(vTaskId).dds_act_est = parseFloat(EAM.utils.Format.number.toStandardFormat(Ext.getCmp("Act_Est_Hours_Field").getValue(), "number"));
                                                gantt.getTask(vTaskId).dds_act_mrc = Ext.getCmp('act_udfchar01').getValue() == "" ? gantt.getTask(vTaskId).dds_evt_mrc : Ext.getCmp('act_udfchar01').getValue();
                                                gantt.getTask(vTaskId).womrc = Ext.getCmp('act_udfchar01').getValue() == "" ? gantt.getTask(vTaskId).dds_evt_mrc : Ext.getCmp('act_udfchar01').getValue();
                                                gantt.getTask(vTaskId).dds_act_percomplete = parseFloat(EAM.utils.Format.number.toStandardFormat(Ext.getCmp("Act_Percentcplt_Field").getValue(), "number"));
                                                gantt.refreshTask(vTaskId, true);
                                                var vData = vSupplierList.data;
                                                var vChildTask = gantt.getTask(vTaskId);

                                                var vMsg = vBoilerList["woupdate_success_message"];
                                                var find = ':param1';
                                                var re = new RegExp(find, 'g');
                                                vMsg = vMsg.replace(re, "1");
                                                find = ':param2';
                                                re = new RegExp(find, 'g');
                                                vMsg = vMsg.replace(re, '1 (' + actTask.parent + ')');
                                                //parent.EAM.Messaging.showConfirmation(vCounter + " of " + vTotalCounter + " projectCode(s) updated successfully.");
                                                EAM.Messaging.showConfirmation(vMsg);
                                                if (vChildTask.dds_act_supplier === "") {
                                                  var vSplitHours = Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("hours")

                                                    Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("dates").forEach(function (_Date) {
                                                      dInitDate = Ext.Date.format(new Date(_Date), 'm/d/Y');
                                                      vOldIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_mrc && item.date === dInitDate && item.trade == '*');
                                                      var vNewValue = 0
                                                        if (vData[vOldIndex]) {
                                                          vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vSplitHours))
                                                            vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                                        }
                                                    });

                                                  var dDateTemp = new Date(Ext.Date.format(vChildTask.start_date, 'm/d/Y')),
                                                  dDateTemp2 = new Date(Ext.Date.format(vChildTask.end_date, 'm/d/Y')),
                                                  dListofDates = [],
                                                  nOccurr = Ext.Date.diffDays(dDateTemp, dDateTemp2) + 1;
                                                  vSplitHours = parseFloat((parseFloat(vChildTask.dds_act_est) / nOccurr).toFixed(2));

                                                  while (dDateTemp <= dDateTemp2) {
                                                    dInitDate = Ext.Date.format(dDateTemp, 'm/d/Y');
                                                    vNewIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_mrc && item.date === dInitDate && item.trade == '*');
                                                    var vNewValue = 0
                                                      if (vData[vNewIndex]) {
                                                        vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vSplitHours))
                                                          vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                                      }
                                                      var dTemp = new Date(dDateTemp);
                                                    dListofDates.push(dTemp);
                                                    dDateTemp.setDate(dDateTemp.getDate() + 1);
                                                  }
                                                  Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("dates", dListofDates);
                                                  Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("hours", vSplitHours);
                                                } else {
                                                  var vSplitHours = Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("hours")

                                                    Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).get("dates").forEach(function (_Date) {
                                                      dInitDate = Ext.Date.format(new Date(_Date), 'm/d/Y');
                                                      vOldIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_supplier && item.date === dInitDate && item.trade == '*');
                                                      var vNewValue = 0
                                                        if (vData[vOldIndex]) {
                                                          vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vSplitHours))
                                                            vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                                        }
                                                    });

                                                  var dDateTemp = new Date(Ext.Date.format(vChildTask.start_date, 'm/d/Y')),
                                                  dDateTemp2 = new Date(Ext.Date.format(vChildTask.end_date, 'm/d/Y')),
                                                  dListofDates = [],
                                                  nOccurr = Ext.Date.diffDays(dDateTemp, dDateTemp2) + 1;

                                                  var dTemp = new Date();

                                                  vSplitHours = parseFloat((parseFloat(vChildTask.dds_act_est) / nOccurr).toFixed(2));

                                                  while (dDateTemp <= dDateTemp2) {
                                                    dInitDate = Ext.Date.format(dDateTemp, 'm/d/Y');
                                                    vNewIndex = vData.findIndex(item => item.supplier_code === vChildTask.dds_act_supplier && item.date === dInitDate && item.trade == '*');
                                                    var vNewValue = 0
                                                      if (vData[vNewIndex]) {
                                                        vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vSplitHours))
                                                          vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                                      }
                                                      dTemp = new Date(dDateTemp);
                                                    dListofDates.push(dTemp);
                                                    dDateTemp.setDate(dDateTemp.getDate() + 1);
                                                  }
                                                  Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("dates", dListofDates);
                                                  Ext.getStore('gantt.taskdatesimpact').getById(vChildTask.id).set("hours", vSplitHours);

                                                }
                                                EAM.Utils.unmask(Ext.ComponentQuery.query('#ActUpdatePanel1')[0].el);

                                                panel.close();

                                                //changeFilter()
                                              } else {
                                                EAM.Utils.unmask(Ext.ComponentQuery.query('#ActUpdatePanel1')[0].el);
                                                panel.close();
                                                gantt.refreshTask(vTaskId, true);
                                                //changeFilter()
                                              }

                                            }, 200);

                                          }

                                        }
                                      ]
                                    });
                                    var vFormPanel = EAM.Utils.getScreen().getCurrentTab().getFormPanel();
                                    vFormPanel.getRecord().set("act_udfchar01", "");
                                    var vUserFieldMotif = Ext.getCmp("act_udfchar01");
                                    vUserFieldMotif.formPanel = vFormPanel;
                                    vUserFieldMotif.lookupLOV = {
                                      lovName: 'LVMRCS',
                                      inputVars: {
                                        'control.org': actTask.organization
                                      },
                                      returnFields: {
                                        'act_udfchar01': 'department'
                                      }
                                    };

                                    vUserFieldMotif.validateLOV = {
                                      lovName: 'LVMRCS',
                                      inputVars: {
                                        'control.org': actTask.organization
                                      },
                                      returnFields: {
                                        'act_udfchar01': 'department'
                                      }
                                    }

                                    panel.show();
                                  }
                                  gantt.refreshTask(vTaskId, true);
                                }
                                if (b.id == "Unsplit Activity") {
                                  var vTotDuration = 0;
                                  var actTaskInit = gantt.getTask(vTaskId);
                                  var actTask0 = gantt.getTask(vTaskId.split('#')[0] + '#' + vTaskId.split('#')[1] + '#0');
                                  var actTask = gantt.getTask(vTaskId.split('#')[0] + '#' + vTaskId.split('#')[1] + '#1');
                                  var vact = actTask.id.split('#')[1];
                                  var vHrs = actTaskInit.dds_act_est;
                                  var vDurationInit = parseFloat(actTaskInit.dds_act_est) * parseFloat(actTaskInit.dds_act_persons)

                                    var vPeople = actTaskInit.dds_act_persons;
                                  var day1 = new Date(actTask.start_date);
                                  var day = new Date(day1.getFullYear(), day1.getMonth(), day1.getDate());
                                  var dayMap = calMap.get(actTask.dds_act_supplier + actTask.dds_act_trade);
                                  var res = dayMap.get(formatDate(day));
                                  if (res.start == res.end) {
                                    for (l = 0; res.start == res.end; l++) {
                                      day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
                                      res = dayMap.get(formatDate(day));
                                    }
                                  }
                                  var endDay = new Date(day);
                                  var dayStart = new Date(day.setMinutes(res.start));
                                  var vMinutes = parseInt(res.start) + parseInt(vHrs * 60);
                                  var dayEnd = new Date(endDay.setMinutes(vMinutes));
                                  var subact = 0;
                                  var projActivity = actTask.id.split('#')[1]; //actTask.id.substring(indexact+1,actTask.length);

                                  var vList = [];
                                  //actTask0.$target= actTask.$target
                                  var vlistOfLinks = [];
                                  for (var _l = 0; _l < actTask.$target.length; _l++) {
                                    vlistOfLinks.push(actTask.$target[_l]);
                                  }
                                  for (_t = 0; _t < vlistOfLinks.length; _t++) {
                                    var clone_link = {}
                                    var vExists = false;
                                    gantt.getLinks().forEach(function (rec) {
                                      if (rec.target == actTask0.id && rec.source == gantt.getLink(vlistOfLinks[_t]).source) {
                                        vExists = true;
                                      }
                                    });
                                    if (!vExists) {
                                      clone_link.id = gantt.uid();
                                      clone_link.target = actTask0.id;
                                      clone_link.source = gantt.getLink(vlistOfLinks[_t]).source;
                                      clone_link.type = gantt.getLink(vlistOfLinks[_t]).type;
                                      clone_link.color = "red";
                                      gantt.addLink(clone_link);
                                    }
                                  }
                                  var vActTaskL = gantt.getTask(gantt.getChildren(actTask0.id)[gantt.getChildren(actTask0.id).length - 1])
                                    vlistOfLinks = [];
                                  for (var _l = 0; _l < vActTaskL.$source.length; _l++) {
                                    vlistOfLinks.push(vActTaskL.$source[_l]);
                                  }
                                  for (_t = 0; _t < vlistOfLinks.length; _t++) {
                                    var clone_link = {}
                                    var vExists = false;
                                    gantt.getLinks().forEach(function (rec) {
                                      if (rec.target == gantt.getLink(vlistOfLinks[_t]).target && rec.source == actTask0.id) {
                                        vExists = true;
                                      }
                                    });
                                    if (!vExists) {
                                      clone_link.id = gantt.uid();
                                      clone_link.target = gantt.getLink(vlistOfLinks[_t]).target;
                                      clone_link.source = actTask0.id;
                                      clone_link.type = gantt.getLink(vlistOfLinks[_t]).type;
                                      clone_link.readonly = true;
                                      clone_link.color = "red";
                                      gantt.addLink(clone_link);
                                    }

                                  }
                                  //actTask0.$source= gantt.getTask(gantt.getChildren(actTask0.id)[gantt.getChildren(actTask0.id).length-1]).$source


                                  for (i = 0; i < gantt.getChildren(actTaskInit.id).length; i++) {
                                    vList.push(gantt.getChildren(actTaskInit.id)[i]);
                                  }
                                  for (_i = 0; _i < vList.length; _i++) {

                                    /*var vSourceLinks = gantt.getLinks();
                                    for(l=0;l<vSourceLinks.length;l++){
                                    if(vSourceLinks[l].source== vList[_i]){
                                    gantt.getLink(vSourceLinks[l].id).source=actTaskInit.id;
                                    gantt.refreshLink(vSourceLinks[l].id)
                                    }
                                    if(vSourceLinks[l].target== vList[_i]){
                                    gantt.getLink(vSourceLinks[l].id).target=actTaskInit.id;
                                    gantt.refreshLink(vSourceLinks[_i].id)
                                    }
                                    }*/
                                    var vChildTask = gantt.getTask(vList[_i])
                                      vTotDuration = vTotDuration + vChildTask.duration
                                      var vDuration = (vChildTask.end_date - vChildTask.start_date) / 3600 / 1000
                                      var vData = vSupplierList.data;

                                    var dNewDate = Ext.Date.format(new Date(dayStart), 'm/d/Y');
                                    var dInitDate = Ext.Date.format(new Date(vChildTask.start_date), 'm/d/Y');
                                    var vOldIndex = null;
                                    var vNewIndex = null;
                                    for (j = 0; j < vData.length; j++) {
                                      if (vData[j].supplier_code == vChildTask.dds_act_supplier && vData[j].trade == vChildTask.dds_act_trade && vData[j].date == dInitDate) {
                                        vOldIndex = j;
                                      }
                                    }
                                    /*for(j=0;j<vData.length;j++){
                                    if(vData[j].supplier_code==vChildTask.dds_act_supplier&&vData[j].trade==vChildTask.dds_act_trade&&vData[j].date==dNewDate){
                                    vNewIndex=j;
                                    }
                                    }*/
                                    var vNewValue = 0
                                      /*if(vData[vNewIndex]){
                                      vNewValue = parseFloat(vData[vNewIndex].sum_act||0)+parseFloat(vDuration)
                                      vData[vNewIndex].sum_act= parseFloat(new Number(vNewValue+'').toFixed(parseInt(12)))
                                      }*/
                                      if (vData[vOldIndex]) {
                                        var actpersons = parseFloat(vChildTask.dds_act_persons || 1)

                                          vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (parseFloat(vDuration) * actpersons)
                                          vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                      }
                                      gantt.deleteTask(vList[_i]);

                                  }
                                  try {

                                    var vRecordToInsert = EAM.Ajax.request({
                                      url: "BSUDSC.HDR",
                                      params: {
                                        "CURRENT_TAB_NAME": "HDR",
                                        "ONLY_DATA_REQUIRED": "true",
                                        "REFRESH_GRID": "false",
                                        "SYSTEM_FUNCTION_NAME": "BSUDSC",
                                        "THROW_EXCEPTION": "false",
                                        "USER_FUNCTION_NAME": "XUSAT1",
                                        "eamid": EAM.SessionStorage.getEamId(),
                                        "wspf_10_pwa_event": '*',
                                        "wspf_10_pwa_act": 1,
                                        "wspf_10_pwa_subact": 1,
                                        "tenant": EAM.AppData.getTenantId()
                                      }
                                    }).responseData.pageData.values;

                                    var vNewDateT = formatDatewithTime(dayStart);
                                    dayEnd = new Date(dayStart);
                                    //dayEnd = new Date(dayEnd.setMinutes(vTotDuration));
                                    //dayEnd.setMinutes(dayEnd.getMinutes()+vTotDuration)
                                    dayEnd.setMinutes(dayEnd.getMinutes() + (parseFloat(actTaskInit.dds_act_est) * 60))
                                    var vNewEndT = formatDatewithTime(dayEnd)
                                      vRecordToInsert["wspf_10_pwa_act"] = projActivity
                                      vRecordToInsert["wspf_10_pwa_supplier"] = actTask.dds_act_supplier
                                      vRecordToInsert["wspf_10_pwa_supplier_org"] = "*"
                                      vRecordToInsert["wspf_10_pwa_trade"] = actTask.dds_act_trade
                                      vRecordToInsert["wspf_10_pwa_duration"] = vDurationInit
                                      vRecordToInsert["wspf_10_pwa_event"] = actTask.id.split('#')[0]
                                      vRecordToInsert["webservicepromptcode"] = "XUSAT1"
                                      vRecordToInsert["processaction"] = "insert"
                                      vRecordToInsert["pagemode"] = "display"
                                      vRecordToInsert["recordid"] = ""
                                      vRecordToInsert["can_insert"] = ""
                                      vRecordToInsert["can_delete"] = ""
                                      vRecordToInsert["can_update"] = ""
                                      vRecordToInsert["PKID"] = actTask.id.split('#')[0] + "#" + projActivity.toString() + "#" + subact.toString()
                                      vRecordToInsert["eamid"] = EAM.SessionStorage.getEamId()
                                      vRecordToInsert["tenant"] = EAM.AppData.getTenantId()
                                      vRecordToInsert["wspf_10_pwa_subact"] = subact
                                      vRecordToInsert["wspf_10_pwa_start"] = vNewDateT
                                      vRecordToInsert["wspf_10_pwa_end"] = vNewEndT

                                      //"PKID": vFormNumber,

                                      var vStatus = EAM.Ajax.request({
                                        url: "BSUDSC.HDR.insertrecord?pageaction=SAVE",
                                        params: Ext.merge(vRecordToInsert, {
                                          SYSTEM_FUNCTION_NAME: "BSUDSC",
                                          USER_FUNCTION_NAME: "XUSAT1",
                                          CURRENT_TAB_NAME: "HDR",
                                          CHECK_CF_CHANGEFLAG: true,
                                          can_update: true,
                                          pagemode: "display"
                                        })
                                      });

                                    actTaskInit.render = null
                                      actTaskInit.start_date = dayStart
                                      actTaskInit.prev_start = dayStart
                                      actTaskInit.end_date = dayEnd
                                      actTaskInit.prev_end = dayEnd
                                      actTaskInit.color = actTask.colormem
                                      actTaskInit.duration = parseFloat(actTaskInit.dds_act_est) * 60
                                      gantt.refreshTask(actTaskInit.id)

                                      var vSourceLinks = gantt.getLinks();
                                    for (l = 0; l < vSourceLinks.length; l++) {
                                      gantt.refreshLink(vSourceLinks[l].id)
                                    }
                                    var vOldIndex = null;
                                    var vNewIndex = null;
                                    var vDuration = (actTaskInit.end_date - actTaskInit.start_date) / 3600 / 1000
                                    var vData = vSupplierList.data;
                                    var dNewDate = Ext.Date.format(new Date(dayStart), 'm/d/Y');
                                    for (j = 0; j < vData.length; j++) {
                                      if (vData[j].supplier_code == actTaskInit.dds_act_supplier && vData[j].trade == actTaskInit.dds_act_trade && vData[j].date == dNewDate) {
                                        vNewIndex = j;
                                      }
                                    }
                                    if (vData[vNewIndex]) {
                                      var actpersons = parseFloat(actTaskInit.dds_act_persons || 1)
                                        vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vDuration) * actpersons)
                                        vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                    }

                                  } catch (e) {
                                    //console.log("InsertPartIntoUDS: " + e)
                                  }

                                  if (vStatus.success) {
                                    var vMsg = gantt.locale.labels.savefilter_success_message;
                                    EAM.Messaging.showConfirmation(vMsg);
                                  }
                                  var vParentId = gantt.getParent(actTaskInit.id)
                                    var vParentStartDate = new Date(gantt.getTask(vParentId).start_date)
                                    var vParentEndDate = new Date(gantt.getTask(vParentId).end_date)

                                    var dEvtStartDate = new Date(vParentStartDate.getFullYear(), vParentStartDate.getMonth(), vParentStartDate.getDate(), 0, 0, 0)
                                    var dEvtEndDate = new Date(vParentEndDate.getFullYear(), vParentEndDate.getMonth(), vParentEndDate.getDate(), 23, 59, 0)
                                    var vEvtUpdated = false;
                                  var dMaxDate = new Date()
                                    var dMinDate = new Date()
                                    var vCount = 0
                                    gantt.getChildren(vParentId).forEach(function (childTask) {
                                      var vChildStartDate = new Date(new Date(gantt.getTask(childTask).start_date).getFullYear(), new Date(gantt.getTask(childTask).start_date).getMonth(), new Date(gantt.getTask(childTask).start_date).getDate(), 0, 0, 0)
                                        var vChildEndDate = new Date(new Date(gantt.getTask(childTask).end_date).getFullYear(), new Date(gantt.getTask(childTask).end_date).getMonth(), new Date(gantt.getTask(childTask).end_date).getDate(), 23, 59, 0)
                                        if (vChildStartDate.getTime() < dMinDate.getTime() || vCount == 0) {
                                          //gantt.getTask(vParentId).start_date = vChildStartDate;
                                          //vEvtUpdated=true;
                                          dMinDate = vChildStartDate;
                                          //gantt.refreshTask(vParentId);
                                        }
                                        if (vChildEndDate.getTime() > dMaxDate.getTime() || vCount == 0) {
                                          //gantt.getTask(vParentId).end_date = vChildEndDate;
                                          //vEvtUpdated=true;
                                          dMaxDate = vChildEndDate;
                                          //gantt.refreshTask(vParentId);
                                        }
                                        vCount = vCount + 1
                                    });
                                  if (dMaxDate.getTime() < dEvtEndDate.getTime()) {
                                    gantt.getTask(vParentId).end_date = dMaxDate;
                                    vEvtUpdated = true;
                                  }
                                  if (dMinDate.getTime() > dEvtStartDate.getTime()) {
                                    gantt.getTask(vParentId).start_date = dMinDate;
                                    vEvtUpdated = true;
                                  }
                                  if (vEvtUpdated) {
                                    gantt.refreshTask(vParentId)

                                    var vProjectRecord = EAM.Ajax.request({
                                      url: "WSJOBS.HDR",
                                      params: {
                                        SYSTEM_FUNCTION_NAME: "WSJOBS",
                                        USER_FUNCTION_NAME: /*gantt.custom_settings.wo_wsjobs_screen[actTask.dds_evt_jobtype]||*/ "WSJOBS", // "WSJOBS",
                                        CURRENT_TAB_NAME: "HDR",
                                        CHECK_CF_CHANGEFLAG: true,
                                        projectcode: vParentId,
                                        organization: gantt.getTask(vParentId).organization,
                                        pagemode: "view"
                                      }
                                    }).responseData.pageData.values;

                                    for (var k in vProjectRecord) {
                                      if (Ext.isObject(vProjectRecord[k])) {
                                        vProjectRecord[k] = vProjectRecord[k].selected
                                      }
                                    }

                                    vProjectRecord.schedstartdate = Ext.Date.format(new Date(gantt.getTask(vParentId).start_date), 'm/d/Y');
                                    vProjectRecord.schedenddate = Ext.Date.format(new Date(gantt.getTask(vParentId).end_date), 'm/d/Y');
                                    //vProjectRecord.recordid = (Math.floor(vProjectRecord.recordid)+1).toString();

                                    vProjectRecord.udfchkbox04 = -1;

                                    var vStatus = EAM.Ajax.request({
                                      url: "WSJOBS.HDR?pageaction=SAVE",
                                      params: Ext.merge(vProjectRecord, {
                                        SYSTEM_FUNCTION_NAME: "WSJOBS",
                                        USER_FUNCTION_NAME: /*gantt.custom_settings.wo_wsjobs_screen[gantt.getTask(vParentId).dds_evt_jobtype]||*/ "WSJOBS",
                                        CURRENT_TAB_NAME: "HDR",
                                        CHECK_CF_CHANGEFLAG: true,
                                        can_update: true,
                                        pagemode: "view"
                                      }),
                                      messagingOptions: {
                                        deferConfirm: !0,
                                        deferWarning: !0,
                                        deferError: !0
                                      }
                                    });
                                  }

                                  //changeFilter()
                                }
                                if (b.id == "Split Activity") {
                                  // Siva: start of split activity
                                  var actTask = gantt.getTask(vTaskId);
                                  var children = gantt.getChildren(actTask.id);
                                  if (children.length == 1 || children.length == 0) {
                                    var vact = actTask.dds_act_act;
                                    var vHrs = actTask.duration / 60;
                                    //var vHrs = parseFloat(actTask.dds_act_est);
                                    var vHrsSplit = 0;
                                    var vLastSplittedId = "";
                                    var day1 = new Date(actTask.start_date);
                                    if (!calMap.entries().next().value || actTask.dds_act_supplier == "" || actTask.dds_act_trade == "") {

                                      EAM.Messaging.showError(vBoilerList["msg_split_nosupplierecord"]);
                                    } else {
                                      for (k = 0; k < 100; k++) {

                                        if (vHrs > vHrsSplit) {

                                          var day
                                          if (Ext.isEmpty(day)) {
                                            day = new Date(day1.getFullYear(), day1.getMonth(), day1.getDate() + k);
                                          } else {
                                            day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
                                          }

                                          var dayMap = calMap.get(actTask.dds_act_supplier + actTask.dds_act_trade);
                                          if (!dayMap) {
                                            EAM.Messaging.showError(vBoilerList["msg_split_nosupplierecord"]);
                                            break;
                                          } else {
                                            var res1 = dayMap.get(formatDate(day));
                                            if (Ext.isObject(res1)) {
                                              var res = res1
                                            }

                                            if (Ext.isObject(res)) {

                                              //var res = dayMap.get(formatDate(day));

                                              if (res.start == res.end) {
                                                for (l = 0; res.start == res.end; l++) {
                                                  day = new Date(day.getFullYear(), day.getMonth(), day.getDate() + 1);
                                                  res = dayMap.get(formatDate(day));
                                                }
                                              }

                                              if (k == 0) {

                                                var vStTime = actTask.start_date.getHours() * 60 + actTask.start_date.getMinutes()
                                                  if (res.end <= vStTime) {
                                                    vStTime = res.start
                                                  }
                                              } else {
                                                var vStTime = res.start

                                              }
                                              var diff = (res.end - vStTime) / 60;
                                              var vhrsadd = 0;
                                              if (k == 0 && parseFloat(vHrs) <= diff) {}
                                              else {
                                                if (vHrs - vHrsSplit >= diff) {
                                                  var endDay = new Date(day);
                                                  var dayStart = new Date(day.setMinutes(day.getMinutes() + vStTime));
                                                  var dayEnd = new Date(endDay.setMinutes(endDay.getMinutes() + res.end));
                                                  vhrsadd = diff;
                                                } else {
                                                  var endDay = new Date(day);
                                                  var remainginghrs = vHrs - vHrsSplit;
                                                  var dayStart = new Date(day.setMinutes(day.getMinutes() + vStTime));
                                                  var vMinutes = parseInt(vStTime) + parseInt(remainginghrs * 60);
                                                  var dayEnd = new Date(endDay.setMinutes(vMinutes));
                                                  diff = remainginghrs
                                                    vhrsadd = remainginghrs;
                                                }
                                                var subact = k + 1;
                                                var indexact = actTask.id.indexOf('#');
                                                var projActivity = actTask.id.split('#')[1]; //actTask.id.substring(indexact+1,actTask.length);
                                                vHrsSplit = vHrsSplit + vhrsadd;
                                                try {
                                                  if (subact == 1) {
                                                    var vRecordToInsert = EAM.Ajax.request({
                                                      url: "BSUDSC.HDR",
                                                      params: {
                                                        "CURRENT_TAB_NAME": "HDR",
                                                        "ONLY_DATA_REQUIRED": "true",
                                                        "REFRESH_GRID": "false",
                                                        "SYSTEM_FUNCTION_NAME": "BSUDSC",
                                                        "THROW_EXCEPTION": "false",
                                                        "USER_FUNCTION_NAME": "XUSAT1",
                                                        "eamid": EAM.SessionStorage.getEamId(),
                                                        "wspf_10_pwa_event": '*',
                                                        "wspf_10_pwa_act": 1,
                                                        "wspf_10_pwa_subact": 1,
                                                        "tenant": EAM.AppData.getTenantId()
                                                      }
                                                    }).responseData.pageData.values;
                                                  }
                                                  var vNewDateT = formatDatewithTime(dayStart);
                                                  var vNewEndT = formatDatewithTime(dayEnd)
                                                    vRecordToInsert["wspf_10_pwa_act"] = projActivity
                                                    vRecordToInsert["wspf_10_pwa_supplier"] = actTask.dds_act_supplier
                                                    vRecordToInsert["wspf_10_pwa_supplier_org"] = "*"
                                                    vRecordToInsert["wspf_10_pwa_trade"] = actTask.dds_act_trade
                                                    vRecordToInsert["wspf_10_pwa_duration"] = ((dayEnd - dayStart) / 1000 / 3600) * parseFloat(actTask.dds_act_persons || 1)
                                                    vRecordToInsert["wspf_10_pwa_event"] = actTask.parent
                                                    vRecordToInsert["webservicepromptcode"] = "XUSAT1"
                                                    vRecordToInsert["processaction"] = "insert"
                                                    vRecordToInsert["pagemode"] = "display"
                                                    vRecordToInsert["recordid"] = ""
                                                    vRecordToInsert["can_insert"] = ""
                                                    vRecordToInsert["can_delete"] = ""
                                                    vRecordToInsert["can_update"] = ""
                                                    vRecordToInsert["PKID"] = actTask.parent + "#" + projActivity.toString() + "#" + subact.toString()
                                                    vRecordToInsert["eamid"] = EAM.SessionStorage.getEamId()
                                                    vRecordToInsert["tenant"] = EAM.AppData.getTenantId()
                                                    vRecordToInsert["wspf_10_pwa_subact"] = subact
                                                    vRecordToInsert["wspf_10_pwa_start"] = vNewDateT
                                                    vRecordToInsert["wspf_10_pwa_end"] = vNewEndT

                                                    //"PKID": vFormNumber,

                                                    var vStatus = EAM.Ajax.request({
                                                      url: "BSUDSC.HDR.insertrecord?pageaction=SAVE",
                                                      params: Ext.merge(vRecordToInsert, {
                                                        SYSTEM_FUNCTION_NAME: "BSUDSC",
                                                        USER_FUNCTION_NAME: "XUSAT1",
                                                        CURRENT_TAB_NAME: "HDR",
                                                        CHECK_CF_CHANGEFLAG: true,
                                                        can_update: true,
                                                        pagemode: "display"
                                                      })
                                                    });
                                                  /*Create Task*/
                                                  var nTask = gantt.copy(actTask);
                                                  nTask.id = actTask.parent + "#" + projActivity.toString() + "#" + subact.toString()
                                                    nTask.start_date = new Date(dayStart)
                                                    nTask.end_date = new Date(dayEnd)
                                                    nTask.prev_start = new Date(dayStart)
                                                    nTask.prev_end = new Date(dayEnd)
                                                    nTask.parent = actTask.id

                                                    var taskId = gantt.addTask(nTask);
                                                  vLastSplittedId = nTask.id;
                                                  gantt.refreshTask(nTask.id)
                                                  /*Update Existing task*/
                                                  /*On reequilibre la charge*/
                                                  var vDuration = diff
                                                    var vData = vSupplierList.data;
                                                  var vOldIndex = null;
                                                  var vNewIndex = null;
                                                  var dInitDate = Ext.Date.format(new Date(actTask.start_date), 'm/d/Y');
                                                  var dNewDate = Ext.Date.format(new Date(vNewDateT), 'm/d/Y');
                                                  for (i = 0; i < vData.length; i++) {
                                                    if (vData[i].supplier_code == actTask.dds_act_supplier && vData[i].trade == actTask.dds_act_trade && vData[i].date == dInitDate) {
                                                      vOldIndex = i;
                                                    }
                                                  }
                                                  for (i = 0; i < vData.length; i++) {
                                                    if (vData[i].supplier_code == actTask.dds_act_supplier && vData[i].trade == actTask.dds_act_trade && vData[i].date == dNewDate) {
                                                      vNewIndex = i;
                                                    }
                                                  }
                                                  var vNewValue = 0
                                                    if (vData[vNewIndex]) {
                                                      var actpersons = parseFloat(actTask.dds_act_persons || 1)

                                                        vNewValue = parseFloat(vData[vNewIndex].sum_act || 0) + (parseFloat(vDuration) * actpersons)
                                                        vData[vNewIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                                    }
                                                    if (vData[vOldIndex] && subact == 1) {
                                                      var actpersons = parseFloat(actTask.dds_act_persons || 1)
                                                        vNewValue = parseFloat(vData[vOldIndex].sum_act || 0) - (vHrs * actpersons)
                                                        vData[vOldIndex].sum_act = parseFloat(new Number(vNewValue + '').toFixed(parseInt(12)))
                                                    }
                                                } catch (e) {
                                                  //console.log("InsertPartIntoUDS: " + e)
                                                }

                                              }
                                            }

                                          } // end if day>vHrsSplit

                                        }

                                      } // end For


                                      if (vLastSplittedId != "") {
                                        actTask.render = "split"
                                          actTask.color = "transparent"
                                          var vFirstSubAct = gantt.getTask(gantt.getChildren(actTask.id)[0]);
                                        var vLastSubAct = gantt.getTask(vLastSplittedId);
                                        //gantt.getTask(gantt.getChildren(actTask.id)[gantt.getChildren(actTask.id).length-1]).$source = gantt.getTask(actTask.id).$source
                                        //gantt.refreshTask(actTask.id)
                                        /* On attache les pere de l'activite mere Ã  la premiere activite*/
                                        var vSourceLinks = actTask.$source;
                                        vSourceLinks.forEach(function (linkId) {
                                          var clone_link = {}
                                          clone_link.id = gantt.uid();
                                          clone_link.source = vLastSubAct.id;
                                          clone_link.target = gantt.getLink(linkId).target;
                                          clone_link.type = 0;
                                          clone_link.readonly = true;
                                          clone_link.color = "red";
                                          gantt.addLink(clone_link);
                                          gantt.getLink(linkId).target = ""
                                            gantt.getLink(linkId).source = ""
                                            gantt.refreshLink(linkId);
                                        });

                                        actTask.$source = []
                                        /* On attache les fils de l'activite mere Ã  la derniere activite */
                                        var vTargetLinks = actTask.$target;
                                        vTargetLinks.forEach(function (linkId) {
                                          var clone_link = {}
                                          clone_link.id = gantt.uid();
                                          clone_link.source = gantt.getLink(linkId).source;
                                          clone_link.target = vFirstSubAct.id;
                                          clone_link.type = 0;
                                          clone_link.readonly = true;
                                          clone_link.color = "red";
                                          gantt.addLink(clone_link);
                                          gantt.getLink(linkId).target = ""
                                            gantt.getLink(linkId).source = ""
                                            gantt.refreshLink(linkId);
                                        });
                                        actTask.$target = []
                                        /*On relie toutes les sous activite entre elles*/
                                        gantt.getChildren(actTask.id).forEach(function (chidlID) {
                                          var vPrevTaskId = chidlID.split('#')[0] + '#' + chidlID.split('#')[1] + '#' + (parseFloat(chidlID.split('#')[2]) - 1);
                                          if ((parseFloat(chidlID.split('#')[2]) - 1) >= 1) {
                                            var clone_link = {}
                                            clone_link.id = gantt.uid();
                                            clone_link.target = chidlID;
                                            clone_link.source = vPrevTaskId;
                                            clone_link.type = 0;
                                            clone_link.readonly = true;
                                            clone_link.color = "white";
                                            gantt.addLink(clone_link);

                                          }
                                        })

                                        /*on rafraichit le lien*/

                                        gantt.refreshTask(actTask.id);
                                        var vMsg = vBoilerList["msg_split_successful"];
                                        EAM.Messaging.showConfirmation(vMsg);
                                        var dEvtStartDate = new Date(new Date(gantt.getTask(gantt.getParent(actTask.id)).start_date).getFullYear(), new Date(gantt.getTask(gantt.getParent(actTask.id)).start_date).getMonth(), new Date(gantt.getTask(gantt.getParent(actTask.id)).start_date).getDate(), 0, 0, 0)
                                          var dEvtEndDate = new Date(new Date(gantt.getTask(gantt.getParent(actTask.id)).end_date).getFullYear(), new Date(gantt.getTask(gantt.getParent(actTask.id)).end_date).getMonth(), new Date(gantt.getTask(gantt.getParent(actTask.id)).end_date).getDate(), 23, 59, 0)
                                          var vEvtUpdated = false;
                                        gantt.getChildren(actTask.id).forEach(function (childTask) {
                                          var vChildStartDate = new Date(new Date(gantt.getTask(childTask).start_date).getFullYear(), new Date(gantt.getTask(childTask).start_date).getMonth(), new Date(gantt.getTask(childTask).start_date).getDate(), 0, 0, 0)
                                            var vChildEndDate = new Date(new Date(gantt.getTask(childTask).end_date).getFullYear(), new Date(gantt.getTask(childTask).end_date).getMonth(), new Date(gantt.getTask(childTask).end_date).getDate(), 23, 59, 0)
                                            if (vChildStartDate.getTime() < dEvtStartDate.getTime()) {
                                              gantt.getTask(gantt.getParent(actTask.id)).start_date = vChildStartDate;
                                              vEvtUpdated = true;
                                              gantt.refreshTask(gantt.getParent(actTask.id));
                                            }
                                            if (vChildEndDate.getTime() > dEvtEndDate.getTime()) {
                                              gantt.getTask(gantt.getParent(actTask.id)).end_date = vChildEndDate;
                                              vEvtUpdated = true;
                                              gantt.refreshTask(gantt.getParent(actTask.id));
                                            }
                                        });
                                        if (vEvtUpdated) {
                                          var vProjectRecord = EAM.Ajax.request({
                                            url: "WSJOBS.HDR",
                                            params: {
                                              SYSTEM_FUNCTION_NAME: "WSJOBS",
                                              USER_FUNCTION_NAME: /*gantt.custom_settings.wo_wsjobs_screen[actTask.dds_evt_jobtype]||*/ "WSJOBS", // "WSJOBS",
                                              CURRENT_TAB_NAME: "HDR",
                                              CHECK_CF_CHANGEFLAG: true,
                                              projectcode: gantt.getParent(actTask.id),
                                              organization: gantt.getTask(gantt.getParent(actTask.id)).organization,
                                              pagemode: "view"
                                            }
                                          }).responseData.pageData.values;

                                          for (var k in vProjectRecord) {
                                            if (Ext.isObject(vProjectRecord[k])) {
                                              vProjectRecord[k] = vProjectRecord[k].selected
                                            }
                                          }

                                          vProjectRecord.schedstartdate = Ext.Date.format(new Date(gantt.getTask(gantt.getParent(actTask.id)).start_date), 'm/d/Y');
                                          vProjectRecord.schedenddate = Ext.Date.format(new Date(gantt.getTask(gantt.getParent(actTask.id)).end_date), 'm/d/Y');
                                          //vProjectRecord.recordid = (Math.floor(vProjectRecord.recordid)+1).toString();

                                          vProjectRecord.udfchkbox04 = -1;

                                          var vStatus = EAM.Ajax.request({
                                            url: "WSJOBS.HDR?pageaction=SAVE",
                                            params: Ext.merge(vProjectRecord, {
                                              SYSTEM_FUNCTION_NAME: "WSJOBS",
                                              USER_FUNCTION_NAME: /*gantt.custom_settings.wo_wsjobs_screen[actTask.dds_evt_jobtype]||*/ "WSJOBS",
                                              CURRENT_TAB_NAME: "HDR",
                                              CHECK_CF_CHANGEFLAG: true,
                                              can_update: true,
                                              pagemode: "view"
                                            }),
                                            messagingOptions: {
                                              deferConfirm: !0,
                                              deferWarning: !0,
                                              deferError: !0
                                            }
                                          });
                                        }

                                      }

                                    }

                                  }

                                }
                              }
                            }
                          });

                          var x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
                          y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;

                          menuContext.showAt(x, y);
                        }
                      }
                    }
                  }

                });

                gantt.templates.tooltip_text = function (start, end, task) {
                  if (document.getElementsByClassName("gantt_tooltip")[0]) {
                    document.getElementsByClassName("gantt_tooltip")[0].remove()
                  }
                  var vText = ""
                    if (task.type == "Activity") {
                      if (task.id.split("#")[2] == 0) {
                        var vDuration = parseFloat(new Number((task.dds_act_est) + '').toFixed(parseInt(12)))
                      } else {
                        var vDuration = parseFloat(new Number((task.duration / 60) + '').toFixed(parseInt(12)))
                      }
                    }

                    if (Ext.getCmp("ShowToolTip").checked) {
                      if (task.type == "Activity") {
                        var vSupplierDesc = ""
                          if (task.dds_act_supplier_desc) {
                            vSupplierDesc = task.dds_act_supplier_desc
                          }
                          vText = '<i>' + vBoilerList["tooltip_desc"] + ': </i><b>' + task.desc + '</b>';
                        //vText += '<br><i>'+vBoilerList["tooltip_specialite"]+':</i><b>' + task.dds_act_trade + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_specialite"] + ': </i><b>' + task.dds_act_trade_desc + '</b>';
                        //vText += '<br><i>'+vBoilerList["tooltip_prestataire"]+':</i><b>' + task.dds_act_supplier + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_department"] + ': </i><b>' + task.dds_mrc_desc + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_prestataire"] + ': </i><b>' + vSupplierDesc + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_nbagents"] + ': </i><b>' + task.dds_act_persons + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_duree"] + ': </i><b>' + vDuration + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_remarque"] + ': </i><b>' + task.dds_act_udfnote01 + '</b>';
                        if (task.delayed_wo) {
                          vText += '<br><i>' + vBoilerList["original_start_date"] + ': </i><b>' + Ext.Date.format(task.original_start_date, EAM.AppData.getAppData().dateformat + ' H:i') + '</b>';
                          vText += '<br><i>' + vBoilerList["original_end_date"] + ': </i><b>' + Ext.Date.format(task.original_end_date, EAM.AppData.getAppData().dateformat + ' H:i') + '</b>';
                        }

                      }
                      if (task.type == "Project") {
                        var vPriorityDesc = ""
                          if (task.dds_priority_desc) {
                            vPriorityDesc = task.dds_priority_desc
                          }
                          vText = '<i>' + vBoilerList["tooltip_desc"] + ': </i><b>' + task.desc + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_equipment"] + ': </i><b>' + task.dds_evt_object + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_type"] + ': </i><b>' + task.dds_jobtype_desc + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_service"] + ': </i><b>' + task.dds_mrc_desc + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_priorite"] + ': </i><b>' + vPriorityDesc + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_statut"] + ': </i><b>' + task.dds_status_desc + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_classe"] + ': </i><b>' + task.dds_class_desc + '</b>';
                        vText += '<br><i>' + vBoilerList["tooltip_affectea"] + ': </i><b>' + task.dds_person_desc + '</b>';
                        if (task.delayed_wo) {
                          vText += '<br><i>' + vBoilerList["original_start_date"] + ': </i><b>' + Ext.Date.format(task.original_start_date, EAM.AppData.getAppData().dateformat + ' H:i') + '</b>';
                          vText += '<br><i>' + vBoilerList["original_end_date"] + ': </i><b>' + Ext.Date.format(task.original_end_date, EAM.AppData.getAppData().dateformat + ' H:i') + '</b>';
                        }
                      }

                      return vText
                    } else {
                      return false
                    }

                }; // Pas le tags


                var weekScaleTemplate = function (date) {
                  var dateToStr = gantt.date.date_to_str("%d %M");
                  var endDate = gantt.date.add(gantt.date.add(date, 1, "week"), -1, "day");
                  return dateToStr(date) + " - " + dateToStr(endDate);
                };

                var vScale = "2";

                vScale = Ext.getCmp("viewmode_gantt").value;
                setScaleConfig(vScale);

                gantt.config.initial_scroll = true;
                gantt.config.grid_resize = false;
                gantt.config.autofit = false;
                gantt.config.sort = true;
                gantt.config.order_branch = false;
                gantt.config.order_branch_free = false;
                gantt.config.start_on_monday = false;

                gantt.templates.scale_cell_class = function (date) {
                  /*if (date.getDay() == 0 || date.getDay() == 6) {
                  return "weekend";
                  }*/
                };
                gantt.templates.timeline_cell_class = function (task, date) {
                  var vScale = Ext.getCmp("viewmode_gantt").value;

                  var currentScale = gantt.config.cust_scale;

                  if (vDaysOfWe.indexOf(date.getDay()) >= 0) {
                    return "weekend";
                  }
                  if (vListOfDaysOF.indexOf(Ext.Date.format(date, 'm-d-Y')) > -1 && vListOfDayTimeOF.indexOf(Ext.Date.format(date, 'm-d-Y')) < 0) {
                    return "weekend";
                  }
                  if (vListOfDayTimeOF.indexOf(Ext.Date.format(date, 'm-d-Y')) > -1 && vScale != "1") {
                    return "partial_weekend";
                  }
                  if (date.getHours() && vScale == "1") {
                    var vDateFinal = Ext.Date.format(date, 'm-d-Y') + "_" + date.getHours().toString();

                    if (vListOfDayTimeOffDetail.indexOf(vDateFinal) > -1) {
                      return "partial_weekend";
                    }
                  }

                  return ""
                };

                gantt.config.keyboard_navigation = false;
                gantt.config.keyboard_navigation_cells = false;

                gantt.config.fit_tasks = false;
                gantt.config.duration_unit = "minute";

                gantt.config.duration_step = 1;
                gantt.attachEvent("onBeforeLinkUpdate", function (id, item) {
                  //any custom logic here
                  if (WOFieldsAttributes.hasOwnProperty("schedstartdate")) {
                    if (WOFieldsAttributes.schedstartdate == "protected" || WOFieldsAttributes.schedstartdate == "hidden") {
                      return false;
                    }
                  }
                  if (WOFieldsAttributes.hasOwnProperty("schedstartdate") && WOFieldsAttributes.hasOwnProperty("udfdate07")) {
                    if (WOFieldsAttributes.schedstartdate == "protected" || WOFieldsAttributes.schedstartdate == "hidden" || WOFieldsAttributes.udfdate07 == "protected" || WOFieldsAttributes.udfdate07 == "hidden") {
                      return false;
                    }
                  }

                  return true;
                });
                gantt.attachEvent("onBeforeLinkDelete", function (id, item) {
                  //any custom logic here
                  if (WOFieldsAttributes.hasOwnProperty("schedstartdate")) {
                    if (WOFieldsAttributes.schedstartdate == "protected" || WOFieldsAttributes.schedstartdate == "hidden") {
                      return false;
                    }
                  }
                  if (WOFieldsAttributes.hasOwnProperty("schedstartdate") && WOFieldsAttributes.hasOwnProperty("udfdate07")) {
                    if (WOFieldsAttributes.schedstartdate == "protected" || WOFieldsAttributes.schedstartdate == "hidden" || WOFieldsAttributes.udfdate07 == "protected" || WOFieldsAttributes.udfdate07 == "hidden") {
                      return false;
                    }
                  }
                  return true;
                });

                (function () {
                  gantt.config.font_width_ratio = 7;

                  gantt.templates.task_text = function taskTextTemplate(start, end, task) {
                    var vColor = getColorRGB(task.color);
                    var vColorRGB = vColor.replaceAll("rgb(", "").replaceAll(" ", "").replaceAll(")", "").split(",")
                      //var luma = 0.2126 * parseInt(vColorRGB[0]) + 0.7152 *  parseInt(vColorRGB[1])  + 0.0722 *  parseInt(vColorRGB[2]) ;
                      var luma = ((parseInt(vColorRGB[0]) * 299) + (parseInt(vColorRGB[1]) * 587) + (parseInt(vColorRGB[2]) * 114)) / 1000;
                    if (task.type == "Project") {
                      if (luma > 155) {
                        // pick a different colour
                        return '<b style="color:black;">' + task.text + '</b>';
                      } else {
                        return '<b style="color:white;">' + task.text + '</b>';
                      }

                    } else {

                      if (parseFloat(task.dds_act_percomplete == "" ? 0 : task.dds_act_percomplete) > 0 && parseFloat(task.dds_act_percomplete == "" ? 0 : task.dds_act_percomplete) <= 99) {
                        return '<b style="color:black;">' + task.text + '</b>';
                      }
                      if (parseFloat(task.dds_act_percomplete == "" ? 0 : task.dds_act_percomplete) == 100) {
                        return '<b style="color:black;">' + task.text + '</b>';
                      }
                      if (luma > 155) {
                        // pick a different colour
                        return '<b style="color:black;">' + task.text + '</b>';
                      } else {
                        return '<b style="color:white;">' + task.text + '</b>';
                      }

                    }
                  };
                  gantt.templates.task_class = function (start, end, task) {
                    var vClass = task.color || "";
                    if (task.risk_collision == "+" && task.type == "Project" && Ext.getCmp("HighLightCollision").checked) {
                      vClass += " flash-original";
                    }
                    if (task.type == "Activity") {
                      if (parseFloat(task.dds_act_percomplete == "" ? 0 : task.dds_act_percomplete) > 0 && parseFloat(task.dds_act_percomplete == "" ? 0 : task.dds_act_percomplete) <= 99) {
                        vClass = " gantt_task_started";
                      }
                      if (parseFloat(task.dds_act_percomplete == "" ? 0 : task.dds_act_percomplete) == 100) {
                        vClass = " gantt_task_completed";
                      }

                    }
                    return vClass.trim();
                  };

                  function getTaskFitValue(task) {
                    var taskStartPos = gantt.posFromDate(task.start_date),
                    taskEndPos = gantt.posFromDate(task.end_date);

                    var width = taskEndPos - taskStartPos;
                    var textWidth = (task.text || "").length * gantt.config.font_width_ratio;

                    if (width < textWidth) {
                      var ganttLastDate = gantt.getState().max_date;
                      var ganttEndPos = gantt.posFromDate(ganttLastDate);
                      if (ganttEndPos - taskEndPos < textWidth) {
                        return "left"
                      } else {
                        return "right"
                      }
                    } else {
                      return "center";
                    }
                  }
                })();

                var dateToStr = gantt.date.date_to_str("%j %F %H:%i");

                gantt.templates.rightside_text = function (start, end, task) {
                  var state = gantt.getState(),
                  modes = gantt.config.drag_mode;

                  if (state.drag_mode == modes.move || (state.drag_mode == modes.resize && state.drag_from_start)) {
                    if (task.type == "Project") {
                      if (state.drag_id == task.id) {
                        if (state.drag_mode == modes.move || (state.drag_mode == modes.resize && state.drag_from_start)) {
                          vLastDragedTaskId = task.id;
                          return dateToStr(end);

                        }
                      }
                    } else {
                      if (state.drag_id == task.id) {
                        if (state.drag_mode == modes.move || (state.drag_mode == modes.resize && state.drag_from_start)) {
                          vLastDragedTaskId = task.id;
                          if (Ext.getCmp("ShowHours").checked) {
                            return dateToStr(end);
                          } else {
                            return dateToStr(gantt.roundDate(end));
                          }

                        }
                      }
                    }
                  } else {
                    if (task.type == "Activity") {

                      if (task.dds_act_percomplete == "") {
                        vText = "(0%)";
                      } else {
                        vText = " (" + task.dds_act_percomplete.toString() + "%)";
                      }
                      if (Ext.getCmp("ShowHours").checked) {
                        var vEndTime = ("0" + end.getHours().toString()).slice(-2) + ":" + ("0" + end.getMinutes().toString()).slice(-2)

                        return '<b style="font-size:8px">' + vEndTime + vText + "</b>";
                      } else {
                        var vEndTime = ("0" + end.getHours().toString()).slice(-2) + ":" + ("0" + end.getMinutes().toString()).slice(-2)

                        return '<b style="font-size:8px">' + vText + "</b>";
                      }
                    } else {
                      if (Ext.getCmp("ShowHours").checked) {
                        var vEndTime = ("0" + end.getHours().toString()).slice(-2) + ":" + ("0" + end.getMinutes().toString()).slice(-2)

                        return '<b style="font-size:8px">' + vEndTime + "</b>";
                      } else {
                        var vEndTime = ("0" + end.getHours().toString()).slice(-2) + ":" + ("0" + end.getMinutes().toString()).slice(-2)

                        return "";
                      }
                    }
                  }

                  return "";
                };

                gantt.templates.leftside_text = function (start, end, task) {
                  var state = gantt.getState(),
                  modes = gantt.config.drag_mode;

                  if (task.type == "Project") {
                    if (state.drag_id == task.id) {
                      if (state.drag_mode == modes.move || (state.drag_mode == modes.resize && state.drag_from_start)) {
                        vLastDragedTaskId = task.id;
                        return dateToStr(start);

                      }

                    } else {
                      if (Ext.getCmp("ShowHours").checked) {
                        var vStartTime = ("0" + start.getHours().toString()).slice(-2) + ":" + ("0" + start.getMinutes().toString()).slice(-2)

                        return '<b style="font-size:8px">' + vStartTime + "</b>";
                      } else {

                        return ""
                      }

                    }
                  } else {
                    if (state.drag_id == task.id) {
                      if (state.drag_mode == modes.move || (state.drag_mode == modes.resize && state.drag_from_start)) {
                        vLastDragedTaskId = task.id;
                        if (Ext.getCmp("ShowHours").checked) {
                          return dateToStr(start);
                        } else {
                          return dateToStr(gantt.roundDate(start));
                        }
                      }
                    } else {
                      var vText = ""

                        if (Ext.getCmp("ShowHours").checked) {
                          var vStartTime = ("0" + start.getHours().toString()).slice(-2) + ":" + ("0" + start.getMinutes().toString()).slice(-2)

                          return '<b style="font-size:8px">' + vStartTime + "</b>";
                        } else {

                          return ""
                        }
                    }

                  }
                  return "";
                };

                gantt.attachEvent("onGanttReady", function () {

                  gantt.render();

                });

              }; // end displayGantt
            } // end if

          } catch (err) {
            console.log(err);
          }

        },
        beforelayout: function () {
          ////console.log("testbeforelayout_ewsuser");
          //console.log("step12");
          if (EAM.Utils.getScreen().userFunction == 'DUPLGD' && Ext.ComponentQuery.query('uxtabpanel')[0]) {
            try {
              Ext.ComponentQuery.query('uxtabpanel')[0].el.dom.style.height = "0px";

            } catch (err) {};

          }; // end if

          //console.log("step14");
        },
        afterlayout: function () {
          ////console.log("testafterlayout_ewsuser");
          //console.log("step12");

          if (EAM.Utils.getScreen().userFunction == 'DUPLGD' && Ext.ComponentQuery.query('uxtabpanel')[0]) {
            try {
              Ext.ComponentQuery.query('uxtabpanel')[0].el.dom.style.height = "0px";
              Ext.getCmp("gantt_here_cont").toggleCollapse();
              Ext.getCmp("gantt_here_cont").toggleCollapse();
            } catch (err) {};

          }; // end if

          //console.log("step13");
        }

      }
    }

    function previousdate() {

      gantt.eachTask(function (etask) {
        gantt.getTask(etask.id).prev_start = new Date(gantt.getTask(etask.id).start_date);
        gantt.getTask(etask.id).prev_end = new Date(gantt.getTask(etask.id).end_date);

      }); // end each
    };

    function formatDate(vDate) {
      var vMonth = vDate.getMonth() + 1;
      var vDay = vDate.getDate();
      var vYear = vDate.getFullYear();
      return ("0" + vMonth.toString()).slice(-2) + '/' + ("0" + vDay.toString()).slice(-2) + '/' + vDate.getFullYear();
    };

    function formatDatewithTime(vDate) {
      var vMonth = vDate.getMonth() + 1;
      var vDay = vDate.getDate();
      var vYear = vDate.getFullYear();
      var vHours = vDate.getHours();
      var vMinutes = vDate.getMinutes();
      if (parseInt(vHours) < 10) {
        vHours = '0' + vHours;
      }
      if (parseInt(vMinutes) < 10) {
        vMinutes = '0' + vMinutes;
      }

      return ("0" + vMonth.toString()).slice(-2) + '/' + ("0" + vDay.toString()).slice(-2) + '/' + vDate.getFullYear() + ' ' + vHours + ':' + vMinutes;
    };

    function setScaleConfig(value) {

      //console.log(value);
      switch (value) {
      case "1":
        gantt.config.cust_scale = "1";
        gantt.config.work_time = false;

        var vStartTime = Ext.getCmp("disp_starttime").value;
        var vEndTime = Ext.getCmp("disp_endtime").value;
        if (!vStartTime || vStartTime == "") {
          vStartTime = 8
        }
        if (!vEndTime || vEndTime == "") {
          vEndTime = 17
        }

        gantt.ignore_time = function (date) {
          if (date.getHours() < parseFloat(vStartTime) || date.getHours() > parseFloat(vEndTime)) {
            return true;
          }

          return false;
        };
        gantt.config.scale_unit = "day";
        gantt.config.min_column_width = 30;
        gantt.config.date_scale = "%d %M, %D";
        gantt.config.show_task_cells = true;
        gantt.config.subscales = [{
            unit: "hour",
            step: 1,
            date: "%H "
          }
        ];
        gantt.templates.date_scale = null;

        break;
      case "2":
        gantt.config.cust_scale = "2";
        gantt.config.work_time = false;
        gantt.ignore_time = function (date) {
          return false
        };
        var weekScaleTemplate = function (date) {
          var dateToStr = gantt.date.date_to_str("%d %M");
          var endDate = gantt.date.add(gantt.date.add(date, 1, "week"),  - (date.getDay() + 1), "day");
          return dateToStr(date) + " - " + dateToStr(endDate) + " / " + Ext.Date.format(date, "Y");
        };
        gantt.config.show_task_cells = true;
        gantt.config.scale_unit = "week";
        //gantt.config.step = 1;
        gantt.config.duration_step = 1;
        gantt.config.font_width_ratio = 7;
        gantt.templates.date_scale = weekScaleTemplate;
        gantt.config.min_column_width = 150;
        //console.log(gantt.config.min_column_width)
        var daysStyle = function (date) {
          //if (date.getDay() == 0 || date.getDay() == 6) {
          if (vDaysOfWe.indexOf(date.getDay()) >= 0) {
            return "weekend";
          }
          if (vListOfDaysOF.indexOf(Ext.Date.format(date, 'm-d-Y')) > -1 && vListOfDayTimeOF.indexOf(Ext.Date.format(date, 'm-d-Y')) < 0) {
            return "weekend";
          }
          if (vListOfDayTimeOF.indexOf(Ext.Date.format(date, 'm-d-Y')) > -1) {
            return "partial_weekend";
          }
          return ""

        };

        gantt.config.subscales = [{
            unit: "day",
            step: 1,
            date: "%j, %D"
            /*,
            css:daysStyle*/

          }
        ];
        //gantt.config.scale_height = 105;

        break;
      case "3":
        gantt.config.cust_scale = "3";
        gantt.ignore_time = function (date) {
          return false
        };
        gantt.config.work_time = false;
        /*gantt.setWorkTime({day: 6, hours: false})
        gantt.setWorkTime({day: 7, hours: false})*/
        gantt.config.show_task_cells = true;
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%F, %Y";
        gantt.config.min_column_width = 150;

        var daysStyle = function (date) {

          if (vDaysOfWe.indexOf(date.getDay()) >= 0) {
            return "weekend";
          }
          if (vListOfDaysOF.indexOf(Ext.Date.format(date, 'm-d-Y')) > -1 && vListOfDayTimeOF.indexOf(Ext.Date.format(date, 'm-d-Y')) < 0) {
            return "weekend";
          }
          if (vListOfDayTimeOF.indexOf(Ext.Date.format(date, 'm-d-Y')) > -1) {
            return "partial_weekend";
          }
          return ""

        };
        gantt.config.subscales = [{
            unit: "day",
            step: 1,
            date: "%j, %D",
            css: daysStyle
          }
        ];
        //gantt.config.scale_height = 105;

        gantt.templates.date_scale = null;
        break;
      case "4":
        gantt.config.cust_scale = "4";
        gantt.ignore_time = function (date) {
          return false
        };
        gantt.config.work_time = false;
        gantt.config.show_task_cells = false;
        gantt.config.scale_unit = "year";
        gantt.config.step = 1;
        gantt.config.date_scale = "%Y";
        gantt.templates.date_scale = null;
        gantt.config.min_column_width = 150;
        //gantt.config.scale_height = 79;

        gantt.config.subscales = [{
            unit: "month",
            step: 1,
            date: "%M"
          }
        ];
        break;
      case "5":
        gantt.config.cust_scale = "5";
        gantt.ignore_time = function (date) {
          return false
        };
        gantt.config.work_time = false;
        gantt.config.scale_unit = "year";
        gantt.config.step = 1;
        gantt.config.date_scale = "%Y";
        gantt.templates.date_scale = null;
        gantt.config.min_column_width = 150;
        //gantt.config.scale_height = 79;
        gantt.config.subscales = [{
            unit: "week",
            step: 1,
            date: gantt.locale.date.date_weekformat + " #%W"
          }
        ];
        break;
      }
    }

    function onScaleChange(value) {
      setScaleConfig(value);
      gantt.render();
    };

    function addUndo(changetype, id, task, parentId, parentKeyID) {
      if (gantt.isTaskExists(task.id)) {
        const OldStartDate = new Date(task.start_date);
        const OldEndDate = new Date(task.end_date);
        const OldPrevtartDate = new Date(task.prev_start);
        const OldPrevEndDate = new Date(task.prev_end);
        if (task.prev_start.getTime() != gantt.getTask(task.id).start_date.getTime() ||
          task.start_date.getTime() != OldPrevtartDate.getTime() ||
          task.prev_end.getTime() != gantt.getTask(task.id).end_date.getTime() ||
          task.end_date.getTime() != OldPrevEndDate.getTime()) {

          var vParentKeyId = parentKeyID;
          if (sessionStorage.getItem("redoactionupdateId")) {
            vParentKeyId = sessionStorage.getItem("redoactionupdateId")
          }

          Ext.getStore('gantt.undo.store').add({
            type: changetype,
            taskid: id,
            task: JSON.stringify(task),
            parentTaskId: vParentKeyId
          })

          undoStack.push({
            type: changetype,
            taskid: id,
            task: JSON.stringify(task)
          });

        } else {
          return false;
        }
      }
    };
  }
}); //# sourceURL=external_DUPLGD_20251015.js