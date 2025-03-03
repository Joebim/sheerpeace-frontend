import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useNotificationStore from "@/store/notification.store";
import { useRouter } from "next/navigation";
// import { Inbox, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface UserDropdownMenuProps {
  children: React.ReactNode;
}

export function NotificationDropdown({ children }: UserDropdownMenuProps) {
  const { notifications, loading } = useNotificationStore();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-96 bg-white rounded-[10px] p-4">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Group for Notifications */}
        <DropdownMenuGroup className="bg-white rounded-[10px]">
          {loading ? (
            // Skeleton loader while notifications are loading
            Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse flex flex-row justify-between p-3"
              >
                <div className="flex flex-row gap-[10px]">
                  {/* Placeholder for the icon */}
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="ml-2 flex flex-col gap-2">
                    {/* Placeholder for title */}
                    <div className="h-4 w-32 bg-gray-300 rounded"></div>
                    {/* Placeholder for message */}
                    <div className="h-3 w-48 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            notifications.map((notif) => (
              <DropdownMenuItem
                key={notif.id}
                onClick={() => router.push(`/notification/${notif.id}`)}
                className="flex flex-row justify-between p-3"
              >
                <div className="flex flex-row gap-[10px]">
                  {/* Icon selection based on notification type */}
                  {/* {notif.type === "success" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {notif.type === "warning" && (
                    <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  )}
                  {notif.type === "error" && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  {notif.type === "info" && (
                    <Inbox className="w-5 h-5 text-blue-500" />
                  )} */}

                  <div className="ml-2 flex flex-col">
                    <span className="font-medium">{notif.subject}</span>
                    <span className="text-sm text-gray-600">
                      {notif.body}
                    </span>
                  </div>
                </div>

                {/* Show a dot for new notifications */}
                <div className="w-[1rem] h-[1rem]">
                  {!notif.is_read && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-red-500" />
                  )}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Option to view all notifications */}
        <DropdownMenuItem>
          <span
            className="text-primary-100"
            onClick={() => router.push("/shoppers/notification")}
          >
            See All Notifications
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
