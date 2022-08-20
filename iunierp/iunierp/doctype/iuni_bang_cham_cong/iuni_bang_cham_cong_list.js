frappe.listview_settings['IUNI Bang Cham Cong'] = {
	onload: function(list_view) {
		let me = this;
		list_view.page.add_inner_button(__("Create Bulk BCC"), function() {
			let dialog = new frappe.ui.Dialog({
				title: __("Create Bulk BCC"),
				fields: [
                    {
                        label: __("Status Condition"),
                        fieldtype: "Select",
                        fieldname: "condition",
                        options: "Equals\nNot Equals",
                        default: "Equals",
                        reqd: 1,
                    },
                    {
                        fieldtype: "Column Break",
                        fieldname: "break1",
                    },
                    {
                        label: __("Employee Status"),
                        fieldtype: "Link",
                        fieldname: "status",
                        options: "Active\nInactive\nPending",
                        default: "Active",
                        reqd: 1,
                    },
                    {
                        fieldtype: "Section Break",
                        fieldname: "sbreak1",
                    },

                    {
                        label: __("From Date"),
                        fieldtype: "Date",
                        fieldname: "from_date",
                        default: frappe.datetime.get_today(),
                        reqd: 1,
                    },
                    {
                        fieldtype: "Column Break",
                        fieldname: "break2",
                    },

                    {
                        label: __("To Date"),
                        fieldtype: "Date",
                        fieldname: "to_date",
                        default: frappe.datetime.get_today(),
                        reqd: 1,
                    }
                ],
				primary_action(data) {
					frappe.confirm(__('Are you sure to perform this action ?'), () => {
						frappe.call({
							method: "iunierp.iunierp.doctype.iuni_bang_cham_cong.iuni_bang_cham_cong.add_bulk",
							args: {
								data: data
							},
							callback: function (r) {
								if (r.message === 1) {
									frappe.show_alert({
										message: __("Recrods Added Successfully"),
										indicator: 'blue'
									});
									cur_dialog.hide();
								}
							}
						});
					});
					dialog.hide();
					list_view.refresh();
				},
				primary_action_label: __('Create Records')

			});
			dialog.show();
		});
		list_view.page.add_inner_button(__("Update Bulk BCC"), function() {
			const selected_docs = list_view.get_checked_items();
			const docnames = list_view.get_checked_items(true);
            if (selected_docs.length > 0) {
				for (let doc of selected_docs) {
					if (doc.docstatus == 1) {
						frappe.throw(__("Cannot update submiited documents."));
					}
				};

                let dialog = new frappe.ui.Dialog({
                    title: __("Update Bulk BCC"),
                    fields: [
                        {
                        "fieldname": "sb_03",
                        "fieldtype": "Section Break",
                        "label": "\u0110\u0103ng k\u00fd Ngh\u1ec9 ph\u00e9p (NP)"
                        },
                        {
                        "fieldname": "annual_leave",
                        "fieldtype": "Select",
                        "label": "NP (ng\u00e0y)",
                        "options": "\n0.25\n0.5\n1"
                        },
                        {
                        "fieldname": "section_break_24",
                        "fieldtype": "Section Break",
                        "label": "\u0110\u0103ng k\u00fd C\u00f4ng t\u00e1c (CT)"
                        },
                        {
                        "fieldname": "biz_trip",
                        "fieldtype": "Select",
                        "label": "CT",
                        "options": "\nQua \u0111\u00eam (1 \u0111\u00eam)\nTrong ng\u00e0y (1 ng\u00e0y)\nTrong ng\u00e0y (s\u00e1ng)\nTrong ng\u00e0y (chi\u1ec1u)"
                        },
                        {
                        "fieldname": "cb_06",
                        "fieldtype": "Column Break"
                        },
                        {
                        "fieldname": "project_biz",
                        "fieldtype": "Link",
                        "label": "M\u00e3 d\u1ef1 \u00e1n (CT)",
                        "options": "IUNI Project"
                        },
                        {
                        "fieldname": "cb_07",
                        "fieldtype": "Column Break"
                        },
                        {
                        "fieldname": "content_biz",
                        "fieldtype": "Data",
                        "label": "N\u1ed9i dung CT"
                        },
                        {
                        "fieldname": "sb_07",
                        "fieldtype": "Section Break",
                        "label": "\u0110\u0103ng k\u00fd L\u00e0m ngo\u00e0i gi\u1edd (LNG)"
                        },
                        {
                        "fieldname": "overtime",
                        "fieldtype": "Select",
                        "label": "LNG (ng\u00e0y)",
                        "options": "\n0.5\n1"
                        },
                        {
                        "fieldname": "column_break_28",
                        "fieldtype": "Column Break"
                        },
                        {
                        "fieldname": "project_overtime",
                        "fieldtype": "Link",
                        "label": "M\u00e3 d\u1ef1 \u00e1n (LNG)",
                        "options": "IUNI Project"
                        },
                        {
                        "fieldname": "cb_09",
                        "fieldtype": "Column Break"
                        },
                        {
                        "fieldname": "content_overtime",
                        "fieldtype": "Data",
                        "label": "N\u1ed9i dung LNG"
                        },
                    ],
                    primary_action(data) {
                        data["docnames"] = docnames;
                        frappe.call({
                            method: "iunierp.iunierp.doctype.iuni_bang_cham_cong.iuni_bang_cham_cong.update_bulk",
                            args: {
                                data: data
                            },
                            callback: function (r) {
                                if (r.message === 1) {
                                    frappe.show_alert({
                                        message: __("Recrods Updated Successfully"),
                                        indicator: 'blue'
                                    });
                                    cur_dialog.hide();
                                }
                            }
                        });
                        dialog.hide();
                        list_view.refresh();
                    },
                    primary_action_label: __('Update Records')

                });
                dialog.show();
            }
        });

    }
};