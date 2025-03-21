import { create } from "zustand";
import axios from "axios";
import { getUserCookie } from "@/lib/cookie";
import { Notification } from "@/types";

interface NotificationState {
  notifications: Notification[];
  loading: boolean;
  addNotification: (notification: Notification) => void;
  getNotifications: () => void;
  markAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  setNotifications: (notifications: Notification[]) => void;
  setLoading: (loading: boolean) => void;
}

const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  loading: false,

  addNotification: (notification) => {
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },

  getNotifications: async () => {
    const { token } = await getUserCookie();
    if (!token) {
      console.warn("User is not authenticated. Cannot fetch notifications.");
      return;
    }

    set({ loading: true });
    try {
      const response = await axios.get<Notification[]>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages`, // Ensure this matches Sheer Peace API
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({
        notifications: response.data,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
      set({ loading: false });
    }
  },

  markAsRead: async (id: string) => {
    const { token } = await getUserCookie();
    if (!token) {
      console.warn("User is not authenticated. Cannot mark notification as read.");
      return;
    }

    set({ loading: true });
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/${id}/mark-as-read`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set((state) => ({
        notifications: state.notifications.map((notif) =>
          notif.id === id ? { ...notif, is_read: true } : notif
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      set({ loading: false });
    }
  },

  deleteNotification: async (id: string) => {
    const { token } = await getUserCookie();
    if (!token) {
      console.warn("User is not authenticated. Cannot delete notification.");
      return;
    }

    set({ loading: true });
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        notifications: state.notifications.filter((notif) => notif.id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error("Failed to delete notification:", error);
      set({ loading: false });
    }
  },

  setNotifications: (notifications: Notification[]) => {
    set({ notifications });
  },

  setLoading: (loading: boolean) => {
    set({ loading });
  },
}));

export default useNotificationStore;
