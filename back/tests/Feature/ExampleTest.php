<?php

it('returns a successful response for the root route', function () {
    $this->get('/')->assertStatus(200);
});
