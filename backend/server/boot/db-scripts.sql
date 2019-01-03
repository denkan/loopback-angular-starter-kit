
/**
 * Example of custom view
 */
DROP VIEW IF EXISTS `myCustomView`;
CREATE VIEW `myCustomView` AS (
	SELECT DISTINCT
    pr.appUserId,
		au.username,
		au.email,
    pr.appId,
    pr.deviceType,
    pr.deviceToken,
    pr.providerType,
		pr.providerToken,
    pr.createdAt
	FROM PushReceiver pr
  INNER JOIN AppUser au ON au.id=pr.appUserId
  ORDER BY pr.appUserId, pr.createdAt
);
