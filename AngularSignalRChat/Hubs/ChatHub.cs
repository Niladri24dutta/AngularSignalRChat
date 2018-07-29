using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace AngularSignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string name,string message)
        {
            await Clients.All.SendAsync("sendToAll", name, message);
        }
            
    }
}
