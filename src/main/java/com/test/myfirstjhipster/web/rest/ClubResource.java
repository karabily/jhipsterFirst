package com.test.myfirstjhipster.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.test.myfirstjhipster.domain.Club;

import com.test.myfirstjhipster.repository.ClubRepository;
import com.test.myfirstjhipster.web.rest.errors.BadRequestAlertException;
import com.test.myfirstjhipster.web.rest.util.HeaderUtil;
import com.test.myfirstjhipster.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Club.
 */
@RestController
@RequestMapping("/api")
public class ClubResource {

    private final Logger log = LoggerFactory.getLogger(ClubResource.class);

    private static final String ENTITY_NAME = "club";

    private final ClubRepository clubRepository;

    public ClubResource(ClubRepository clubRepository) {
        this.clubRepository = clubRepository;
    }

    /**
     * POST  /clubs : Create a new club.
     *
     * @param club the club to create
     * @return the ResponseEntity with status 201 (Created) and with body the new club, or with status 400 (Bad Request) if the club has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/clubs")
    @Timed
    public ResponseEntity<Club> createClub(@RequestBody Club club) throws URISyntaxException {
        log.debug("REST request to save Club : {}", club);
        if (club.getId() != null) {
            throw new BadRequestAlertException("A new club cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Club result = clubRepository.save(club);
        return ResponseEntity.created(new URI("/api/clubs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /clubs : Updates an existing club.
     *
     * @param club the club to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated club,
     * or with status 400 (Bad Request) if the club is not valid,
     * or with status 500 (Internal Server Error) if the club couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/clubs")
    @Timed
    public ResponseEntity<Club> updateClub(@RequestBody Club club) throws URISyntaxException {
        log.debug("REST request to update Club : {}", club);
        if (club.getId() == null) {
            return createClub(club);
        }
        Club result = clubRepository.save(club);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, club.getId().toString()))
            .body(result);
    }

    /**
     * GET  /clubs : get all the clubs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of clubs in body
     */
    @GetMapping("/clubs")
    @Timed
    public ResponseEntity<List<Club>> getAllClubs(Pageable pageable) {
        log.debug("REST request to get a page of Clubs");
        Page<Club> page = clubRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/clubs");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /clubs/:id : get the "id" club.
     *
     * @param id the id of the club to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the club, or with status 404 (Not Found)
     */
    @GetMapping("/clubs/{id}")
    @Timed
    public ResponseEntity<Club> getClub(@PathVariable Long id) {
        log.debug("REST request to get Club : {}", id);
        Club club = clubRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(club));
    }

    /**
     * DELETE  /clubs/:id : delete the "id" club.
     *
     * @param id the id of the club to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/clubs/{id}")
    @Timed
    public ResponseEntity<Void> deleteClub(@PathVariable Long id) {
        log.debug("REST request to delete Club : {}", id);
        clubRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
