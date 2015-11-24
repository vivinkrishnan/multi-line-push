/**
* Copyright 2015 IBM Corp.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

function sendBroadcastNotification(applicationId, notificationText) {
    var notificationOptions = {};
    
    notificationOptions = getNotificationOptions(notificationText);
    
    WL.Server.sendMessage(applicationId, notificationOptions);
    
    return {
        result : "Notification sent to all users."
    };
}

function sendTagNotification(applicationId,notificationText, notificationTags) {
    var notificationOptions = {};
    
    notificationOptions = getNotificationOptions(notificationText, notificationTags);
    
    WL.Server.sendMessage(applicationId, notificationOptions);
    
    return {
        result : "Notification sent to users subscribed to the tag(s): '" + notificationTags + "'." 
    };
}

function getNotificationOptions(notificationText, notificationTags){
    
    var notificationOptions = {};
    
    notificationOptions.message = {};
    notificationOptions.target = {};
    notificationOptions.settings={};
    
    if(notificationTags != undefined && notificationTags != null){
        var tags = notificationTags.split(",");
        notificationOptions.target.tagNames = tags;
    }
    
    notificationOptions.message.alert = notificationText;
       
    // set raw notification properties for MPNS
    notificationOptions.settings.mpns = {};
    notificationOptions.settings.mpns.raw = {};
    notificationOptions.settings.mpns.raw.payload = {"custom":"data"};
    
    // set toast notification properties for MPNS
    notificationOptions.settings.mpns.toast = {};
    notificationOptions.settings.mpns.toast.text1 = "Toast title";
    notificationOptions.settings.mpns.toast.text2 = "Toast content";

    // set tile notification properties for MPNS
    notificationOptions.settings.mpns.tile = {};
    notificationOptions.settings.mpns.tile.title = notificationText ;
    notificationOptions.settings.mpns.tile.count = 1;
    
    // set raw notification properties for WNS
    notificationOptions.settings.wns = {};
    notificationOptions.settings.wns.raw = {};
    notificationOptions.settings.wns.raw.payload = {"custom":"data"};

    // set toast notification properties for WNS
    notificationOptions.settings.wns.toast = {};
    notificationOptions.settings.wns.toast.launch = {"custom":"data"};
    notificationOptions.settings.wns.toast.visual = {};
    notificationOptions.settings.wns.toast.visual.binding = {};
    notificationOptions.settings.wns.toast.visual.binding.template="ToastText04";
    notificationOptions.settings.wns.toast.visual.binding.text=[{"content":"Text1"},{"content":"Text2"},{"content":"Text3"}];

    // set tile notification properties for WNS
    notificationOptions.settings.wns.tile = {};
    notificationOptions.settings.wns.tile.visual = {};
    notificationOptions.settings.wns.tile.visual.binding=[{"template":"TileSquareText04", "text": [{"content":"Text1"}]}, {"template":"TileWideText04","text": [{"content":"Text1"}]}];

    // set badge notification properties for WNS
    notificationOptions.settings.wns.badge = {};
    notificationOptions.settings.wns.badge.value = 10; 
    
    return notificationOptions;
    
}
