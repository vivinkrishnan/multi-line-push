package com.MultiLineNotifications;

import org.json.JSONException;
import org.json.JSONObject;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;

public class GCMIntentService extends com.worklight.androidgap.push.GCMIntentService{
	
	@Override
	public void notify(Context context, String alert, int badge, String sound,
			Intent intent) {
		
		Notification notification = createNotification(context, alert, getNotificationTitle(context), alert, badge, true, 0, intent);
		
		NotificationManager notificationManager = (NotificationManager) context
				.getSystemService(Context.NOTIFICATION_SERVICE);
		notificationManager.notify(1, notification);	
		
	}

	@Override
	public void notify(Context context, String tickerText) {
		
		Notification notification = createNotification(context, tickerText, getNotificationTitle(context), tickerText, 0, true, 0, null);
  		
		NotificationManager notificationManager = (NotificationManager) context
				.getSystemService(Context.NOTIFICATION_SERVICE);
		notificationManager.notify(1, notification);
	}
    
	@Override
	public void notify(Context context, Message message, Intent intent) {
		
		JSONObject props= message.getProps();
		String alert="";
		int badge=0;
		int priority=0;
		
		try {
			alert=props.getString("alert");
			badge=props.getInt("badge");
			priority=props.getInt("priority");
			
		} catch (JSONException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
		Notification notification = createNotification(context, alert, getNotificationTitle(context), alert , badge , true, priority, intent);
 		
 		NotificationManager notificationManager = (NotificationManager) context
				.getSystemService(Context.NOTIFICATION_SERVICE);
		
 		notificationManager.notify(1, notification);
 	}

	private Notification createNotification(Context context, String ticker, String title, String msg, int badge, boolean bridge, int priority, Intent intent) {
 		int androidSdkVersion = android.os.Build.VERSION.SDK_INT;
 		int icon = RES_PUSH_NOTIFICATION_ICON;
 		long when = System.currentTimeMillis();		
 		Notification notification = null;
 			
 		PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);		
 		
		Notification.Builder notificationBuilder = new Notification.Builder(this)
                						.setSmallIcon(icon)
						                .setTicker(ticker)
						                .setWhen(when)
										.setContentTitle(title)
						                .setContentText(msg)
										.setStyle(new Notification.BigTextStyle().bigText(msg))
										.setContentIntent(pendingIntent);
 		
 		notification = notificationBuilder.build();
 		notification.priority = priority;
 		
 		notification.number = badge;
 		notification.flags |= Notification.FLAG_AUTO_CANCEL;
 		
 		return notification;
 	}
}
