# Copyright (c) 2022, Shahzad Naser and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document
import json
from datetime import date, timedelta

class IUNIBangChamCong(Document):
	def autoname(self):
		self.name = "BCC-{}-{}".format(self.get("employee"),self.get("date"))

@frappe.whitelist(allow_guest=True)
def ping():
	pass

@frappe.whitelist()
def add_bulk(data):
	if isinstance(data, str):
		data = json.loads(data)
	filters = frappe._dict(data)
	if not filters.get("from_date") or not filters.get("to_date") or  not filters.get("status"):
		frappe.thorw(_("Status, From Date and To Date are required."))
		return
	emp_filters = {}
	if filters.get("condition") == "Equals":
		emp_filters["status"] = filters.get("status")
	else:
		emp_filters["status"] = ["!=",filters.get("status")]

	from_date = frappe.utils.getdate(filters.get("from_date"))
	to_date = frappe.utils.getdate(filters.get("to_date"))
	delta = timedelta(days=1)
	while from_date <= to_date:
		frappe.errprint(from_date)
		for emp in frappe.get_list("IUNI Employee",emp_filters):
			try:
				if not frappe.db.exists("IUNI Bang Cham Cong",{"employee":emp.get("name"), "date":from_date}):
					doc = frappe.new_doc("IUNI Bang Cham Cong")
					doc.employee = emp.get("name")
					doc.date = from_date
					doc.flags.ignore_permissions = True
					doc.save()
			except Exception as error:
				traceback = frappe.get_traceback()
				frappe.log_error(message=traceback , title="Error in Bulk Creation")
				continue
		from_date += delta

@frappe.whitelist(allow_guest=True)
def update_bulk(data):
	if isinstance(data, str):
		data = json.loads(data)
	data = frappe._dict(data)

	frappe.errprint(data)
	for docname in data.get("docnames"):
		frappe.errprint(docname)
		try:
			if frappe.db.exists("IUNI Bang Cham Cong",docname):
				frappe.errprint("{} exists".format("docname"))	
				doc = frappe.get_doc("IUNI Bang Cham Cong",docname)
				doc.annual_leave = data.get("annual_leave")
				doc.biz_trip = data.get("biz_trip")
				doc.project_biz = data.get("project_biz")
				doc.content_biz = data.get("content_biz")
				doc.overtime = data.get("overtime")
				doc.project_overtime = data.get("project_overtime")
				doc.content_overtime = data.get("content_overtime")
				# doc.employee = data.get("name")
				# doc.employee = data.get("name")
				doc.flags.ignore_permissions = True
				doc.save()
				frappe.errprint("{} Saved".format("docname"))	
		except Exception as error:
			traceback = frappe.get_traceback()
			frappe.log_error(message=traceback , title="Error in Bulk Updating")
			continue