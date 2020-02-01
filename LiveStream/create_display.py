import os
import time
import json
import tkinter as tk
from tkinter import *
from tkinter import ttk
from firebase_admin import db
from firebase_admin import credentials
import firebase_admin
import requests

cred = credentials.Certificate("./livestream-e89a8-firebase-adminsdk-ay0ty-88999d90c1.json")
firebase_admin.initialize_app(cred, {'databaseURL': 'https://livestream-e89a8.firebaseio.com'})

main_window = Tk()

frm = Frame(main_window)
frm.pack(side=tk.LEFT, padx=20)

tv = ttk.Treeview(frm, columns=(1,2,3,4), show = "headings", height = "5")
tv.pack()
tv.heading(1, text="S.No")
tv.heading(2, text="IP address")
tv.heading(3, text="Stream Name")
tv.heading(4, text="Description")

main_window.title("Live_sessions")
main_window.geometry("1000x350")
main_window.resizable(False, False)


hashes_list=[]

def update_table():
    try:
        global hashes_list
        hashes_list=[]
        tv.delete(*tv.get_children())
        livestream_db = db.reference('streamers/')
        livestream_data = livestream_db.get('streamers')
        try:
            for i in range(0,len(livestream_data)-1):
                #print(livestream_data[i])
                for key in livestream_data[i]:
                    vlc_command = '''vlc "rtmp://{1}/WebRTCApp/{0} live=1"'''.format(livestream_data[i][key]['hash'],livestream_data[i][key]['ip'])
                    tv.insert('', 'end', values=(i,livestream_data[i][key]['ip'],livestream_data[i][key]['streamname'],livestream_data[i][key]['description']))
                    hashes_list.append(vlc_command)  
        except:
            pass
    except:
        pass
    
def join_call():
    try:
        item = tv.selection()[0]
        os.system(hashes_list[(int(tv.item(item,'values')[0]))])
        #print(hashes_list[i])
    except:
        pass

legal_users = [
    "Vitalik","Sahnan","Vasu","Aditya","Parth","Matic","Ethereum"
]

def Authentcate():
    global entry
    global popup
    username = entry.get()
    if username in legal_users:

        # url = "http://192.168.24.144:5000/userAddress"
        
        # mydict = {
        #     "username" : username
        # }

        # payload = json.loads(json.dumps(mydict))

        # r = requests.post(url, (payload))

        join_call()

    popup.destroy()


def popupmsg():
    global entry
    global popup
    popup = tk.Tk()
    popup.wm_title("Confirm Payment")
    label = ttk.Label(popup, text="Please Enter your Etherium ID")
    label.pack(side="top", fill="x", pady=10)

    entry = Entry(popup)
    entry.focus_set()
    entry.pack()
    B1 = Button(popup, text="Submit", command= Authentcate)
    #B1.bind("<Double-1>", Authentcate(entry, popup))
    B1.pack()
    popup.mainloop()
    #popup.destroy()

entry = Entry(main_window)
popup = tk.Tk()

btn = Button(main_window, text = 'Refresh!', bd = '5', 
                          command = update_table)

call = Button(main_window, text = 'Join Call!', bd = '5', 
                          command = popupmsg)



call.pack()
update_table() 
btn.pack()
#entry.pack()
main_window.mainloop()   