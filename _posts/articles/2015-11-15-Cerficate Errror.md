---
layout: article
category : articles
title :  Certificate Error
tagline: ""
tags : [CA]
image:
  feature:
  teaser: Certificate.jpg
---


## Cannot access web site starting with "https"
Using Chrome browser, I cannot access google, facebook and so on. <br/>
The page give me information that your connection is not encryption connection.<br/>
NET::ERR_CERT_AUTHORITY_INVALID  <br/>
<br/>
## Why
The reason in my case is , I use company' proxy to access these web sites. <br/>
But the proxy certificate is missing.<br/>
### Solution

Find the certificate, I find it in my computer,(I lost it in my virtual machine.)<br/>
Export it.<br/>

Then import it into the chrome SSL which is in the VM.<br/>

That's OK.


